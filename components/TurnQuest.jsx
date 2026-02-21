"use client";
import React, { useEffect, useState } from "react";
import { displayNameOf } from "../lib/utils";
import {
  listenTickets,
  createTicket as dbCreate,
  updateTicket,
  deleteTicket,
} from "../lib/tickets";
import {
  adjustUserPoints,
  listenUsers,
  setUserActive,
  updateUser as persistUser,
} from "../lib/users";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Board from "./Board";
import PointsView from "./PointsView";
import UsersManagement from "./UsersManagement";
import Profile from "./Profile";
import ChatButton from "./ChatButton";
import ChatPanel from "./ChatPanel";
import TicketModal from "./TicketModal";
import UserEditModal from "./UserEditModal";
import TicketDetails from "./TicketDetails";

const DONE_STATUS = "Done";

const defaultTicket = {
  title: "",
  description: "",
  points: 1,
  assignee: "",
  status: "Open",
};

const TurnQuest = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [currentTab, setCurrentTab] = useState("board");
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [draggedTicket, setDraggedTicket] = useState(null);
  const [newTicket, setNewTicket] = useState({ ...defaultTicket });

  useEffect(() => listenTickets(setTickets), []);
  useEffect(() => listenUsers(setUsers), []);

  const createTicket = async () => {
    if (!newTicket.title || !newTicket.assignee) return;

    const assignee = users.find((u) => u.email === newTicket.assignee);
    if (!assignee) return alert("Assignee not found");

    const requestedStatus = isAdmin ? newTicket.status : "Open";
    const points = Number(newTicket.points || 0);
    const pointsAwarded = requestedStatus === DONE_STATUS;

    try {
      await dbCreate({
        title: newTicket.title,
        description: newTicket.description,
        points,
        status: requestedStatus,
        assigneeUid: assignee.id,
        assigneeName: displayNameOf(assignee),
        pointsAwarded,
      });

      if (pointsAwarded) {
        await adjustUserPoints(assignee.id, points);
      }

      setNewTicket({ ...defaultTicket });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Could not create ticket");
    }
  };

  const handleDragStart = (ticket) => setDraggedTicket(ticket);

  const handleDrop = async (newStatus) => {
    if (!draggedTicket) return;
    if (newStatus === DONE_STATUS && !isAdmin) {
      alert("Only admins can mark a ticket Done");
      setDraggedTicket(null);
      return;
    }

    const wasDone = draggedTicket.status === DONE_STATUS && draggedTicket.pointsAwarded;
    const nowDone = newStatus === DONE_STATUS;
    const points = Number(draggedTicket.points || 0);
    const updates = { status: newStatus };

    try {
      if (!wasDone && nowDone) {
        await adjustUserPoints(draggedTicket.assigneeUid, points);
        updates.pointsAwarded = true;
      } else if (wasDone && !nowDone) {
        await adjustUserPoints(draggedTicket.assigneeUid, -points);
        updates.pointsAwarded = false;
      }
      await updateTicket(draggedTicket.id, updates);
    } catch (err) {
      console.error(err);
      alert("Move denied. You may not have permission.");
    } finally {
      setDraggedTicket(null);
    }
  };

  const getStatusTickets = (status) => tickets.filter((ticket) => ticket.status === status);

  const editUser = (nextUser) => {
    setEditingUser({ ...nextUser });
    setShowUserModal(true);
  };

  const updateUser = async () => {
    if (!editingUser) return;
    try {
      await persistUser(editingUser.id, {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        isActive: editingUser.isActive,
      });
      setShowUserModal(false);
      setEditingUser(null);
    } catch (err) {
      console.error(err);
      alert("Could not update user");
    }
  };

  const awardPoints = async (targetUser, points) => {
    try {
      await adjustUserPoints(targetUser.id, points);
    } catch (err) {
      console.error(err);
      alert("Could not award points");
    }
  };

  const toggleUserStatus = async (targetUser) => {
    try {
      await setUserActive(targetUser.id, !targetUser.isActive);
    } catch (err) {
      console.error(err);
      alert("Could not update status");
    }
  };

  const openTicket = (ticket) => setSelected(ticket);

  const handleDeleteTicket = async (id) => {
    const ticket = tickets.find((item) => item.id === id);
    try {
      if (ticket?.pointsAwarded) {
        await adjustUserPoints(ticket.assigneeUid, -Number(ticket.points || 0));
      }
      await deleteTicket(id);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setSelected(null);
    }
  };

  return (
    <main className="min-h-screen w-screen bg-[#f0f4f7] font-[Inter] relative">
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setShowModal={setShowModal}
      />

      {currentTab === "board" && (
        <Board
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          getStatusTickets={getStatusTickets}
          openTicket={openTicket}
        />
      )}

      {currentTab === "points" && <PointsView users={users} />}

      {isAdmin && currentTab === "users" && (
        <UsersManagement
          users={users}
          editUser={editUser}
          toggleUserStatus={toggleUserStatus}
          awardPoints={awardPoints}
        />
      )}

      {!isAdmin && currentTab === "profile" && <Profile tickets={tickets} />}

      <ChatButton showChat={showChat} setShowChat={setShowChat} />
      {showChat && <ChatPanel showChat={showChat} />}

      {showModal && (
        <TicketModal
          newTicket={newTicket}
          setNewTicket={setNewTicket}
          createTicket={createTicket}
          setShowModal={setShowModal}
          users={users}
          isAdmin={isAdmin}
        />
      )}

      {showUserModal && editingUser && (
        <UserEditModal
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          updateUser={updateUser}
          setShowUserModal={setShowUserModal}
        />
      )}

      {selected && (
        <TicketDetails
          ticket={selected}
          isAdmin={isAdmin}
          onClose={() => setSelected(null)}
          onDelete={handleDeleteTicket}
        />
      )}
    </main>
  );
};

export default TurnQuest;
