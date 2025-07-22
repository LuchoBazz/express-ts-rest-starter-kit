import type { AuthTokenStatusResponse } from "../../core/entities/auth_token_statuses.entity";
import useRevokeTokenById from "../../core/hooks/revoke-token-by-id.hook";
import { formatDate, reloadWindow } from "../../core/utils";

const SessionLimitCard = (params: AuthTokenStatusResponse) => {
  const { revokeTokenById } = useRevokeTokenById();

  const deletionHandle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    const success = await revokeTokenById(id);
    if (success) {
      reloadWindow();
    }
  };

  return (
    <div className="max-w-xl mt-3 mx-auto bg-gray-700 shadow-md rounded-xl">
      <div className="px-4 py-3">
        <div className="flex items-start">
          <div className="flex-grow truncate">
            <div className="w-full sm:flex justify-between items-center mb-2">
              <h2 className="text-xl leading-tight font-bold text-gray-50 truncate mb-1 sm:mb-0">
                {params.user_agent}
              </h2>
            </div>
            <span className="bg-green-500 px-1.5 py-0.5 font-semibold text-xs rounded-lg text-white">Active</span>
            <div className="flex items-end justify-between whitespace-normal">
              <div className="max-w-sm text-indigo-100">
                <p className="mb-1"></p>
              </div>
            </div>
            <div className="flex items-center ml-3">
              <span className="text-xs text-gray-400">Started {formatDate(new Date(params.issued_at))}</span>
            </div>
          </div>
          <div className="flex flex-col mt-auto gap-2">
            <button
              onClick={deletionHandle}
              id={params.id}
              className="cursor-pointer flex gap-1.5 items-center text-left text-xs font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100"
            >
              <svg width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z"
                  fill="#fff"
                ></path>
                <path
                  d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z"
                  fill="#fff"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionLimitCard;
