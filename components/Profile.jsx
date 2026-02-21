import { useAuth } from '../context/AuthContext';

export default function Profile({ tickets }) {
  const { user } = useAuth();
  const userId = user?.uid || user?.id;
  const completedTasks = tickets.filter(
    (t) => t.assigneeUid === userId && t.status === "Done"
  );

  return (
    <section className="mx-auto max-w-[700px] p-6">
      <div className="rounded-xl bg-white p-8 shadow">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">My Profile</h2>

        <div className="space-y-4 text-slate-700">
          <div className="flex items-center justify-between">
            <span>Completed tasks:</span>
            <span className="font-medium">{completedTasks.length}</span>
          </div>

          <div className="flex items-center justify-between">
            <span>Total points:</span>
            <span className="font-medium">{user.points ?? 0}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
