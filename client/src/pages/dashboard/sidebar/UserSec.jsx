import EditNoteIcon from "@mui/icons-material/EditNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function UserSec({ user, onNewEntry }) {
  return (
    <>
      <div className="px-4 pt-5 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border">
              <AccountCircleIcon className="text-gray-500" />
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {user?.username || "My Profile"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "Not signed in"}
            </p>
          </div>
        </div>

        <button
          onClick={onNewEntry}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                     bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <EditNoteIcon fontSize="small" />
          <span>New Entry</span>
        </button>
      </div>
    </>
  );
}
