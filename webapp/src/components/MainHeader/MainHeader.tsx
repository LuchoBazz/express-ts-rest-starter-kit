import { useNavigate } from "react-router-dom";

import { removeAuthStorage } from "../../core/utils";
import useLogOut from "../../core/hooks/logout.hook";

// Reference: https://tailwindflex.com/@ameth1208/sidebar-3
const MainHeader = () => {
  const navigate = useNavigate();
  const { logOut } = useLogOut();

  const LogOutHandler = async () => {
    await logOut();
    removeAuthStorage();
    navigate("/log-in");
  };

  return (
    <div className="w-dvw h-dvh bg-gray-200 grid grid-cols-7">
      <div className="col-span-1 bg-white">
        <div className="p-2 h-full w-full flex flex-col bg-white dark:bg-gray-900 border-r border-r-gray-200">
          <a href="#">
            <div className="flex justify-center lg:justify-start items-center gap-2 py-2 px-0 md:px-2 lg:px-4 cursor-pointer ">
              <svg width="36" height="36" viewBox="0 0 903 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M814.39 736.55L751.05 699.74L750.81 617.11L814.15 653.92L814.39 736.55Z" fill="#00717E"></path>
                <path d="M520.46 997.94L457.12 961.13L456.86 869.58L520.2 906.39L520.46 997.94Z" fill="#00717E"></path>
                <path d="M520.2 906.39L456.86 869.58L751.05 699.74L814.39 736.55L520.2 906.39Z" fill="#00B6CA"></path>
                <path d="M608.06 681.21L544.72 644.4L838.91 474.55L902.25 511.36L608.06 681.21Z" fill="#00B6CA"></path>
                <path d="M519.97 823.77L456.63 786.96L455.87 521.56L519.22 558.37L519.97 823.77Z" fill="#00717E"></path>
                <path d="M519.22 558.37L455.87 521.56L838.41 300.7L901.75 337.51L519.22 558.37Z" fill="#00B6CA"></path>
                <path
                  d="M901.75 337.51L902.01 429.05L607.83 598.9L608.06 681.21L902.25 511.36L903 777.08L520.46 997.94L520.2 906.39L814.39 736.55L814.15 653.92L519.97 823.77L519.22 558.37L901.75 337.51Z"
                  fill="#00A3B6"
                ></path>
                <path d="M75.75 554.2L139.09 517.4L138.34 784.69L75 821.5L75.75 554.2Z" fill="#1D49C5"></path>
                <path d="M1.25 338.65L64.59 301.84L149.22 350.7L85.88 387.51L1.25 338.65Z" fill="#2152DC"></path>
                <path d="M85.88 387.51L149.22 350.7L255.26 668.51L191.92 705.32L85.88 387.51Z" fill="#2459EF"></path>
                <path d="M308.29 688.46L371.63 651.65L254.74 851.89L191.4 888.7L308.29 688.46Z" fill="#1D49C5"></path>
                <path d="M383.77 559.5L447.11 522.69L445.87 962.24L382.53 999.05L383.77 559.5Z" fill="#1D49C5"></path>
                <path d="M299.15 510.64L362.49 473.83L447.11 522.69L383.77 559.5L299.15 510.64Z" fill="#2152DC"></path>
                <path
                  d="M383.77 559.5L382.53 999.05L307.53 955.76L308.29 688.46L191.4 888.7L75.75 554.2L75 821.5L0 778.2L1.25 338.65L85.88 387.51L191.92 705.32L299.15 510.64L383.77 559.5Z"
                  fill="#143389"
                ></path>
                <path d="M832.32 218.54L832.12 291.8L752.97 337.8L753.18 264.54L832.32 218.54Z" fill="#007DC5"></path>
                <path d="M753.18 264.54L752.97 337.8L370.44 116.94L370.65 43.68L753.18 264.54Z" fill="#005789"></path>
                <path d="M449.8 -2.31L832.32 218.54L753.18 264.54L370.65 43.68L449.8 -2.31Z" fill="#008CDC"></path>
                <path d="M387.82 136.05L387.62 209.31L237.03 296.82L237.23 223.56L387.82 136.05Z" fill="#007DC5"></path>
                <path d="M514.52 300.89L514.31 374.15L421.06 320.31L421.27 247.05L514.52 300.89Z" fill="#005789"></path>
                <path d="M452.27 439.4L452.06 512.66L69.54 291.81L69.74 218.55L452.27 439.4Z" fill="#005789"></path>
                <path
                  d="M602.86 351.89L531.42 393.41L452.27 439.4L452.06 512.66L531.21 466.67L602.65 425.15L681.8 379.15L682.01 305.89L602.86 351.89Z"
                  fill="#007DC5"
                ></path>
                <path
                  d="M421.27 247.05L500.41 201.05L682.01 305.89L602.86 351.89L531.42 393.41L452.27 439.4L69.74 218.55L299.48 85.04L387.82 136.05L237.23 223.56L443.08 342.4L514.52 300.89L421.27 247.05Z"
                  fill="#008CDC"
                ></path>
              </svg>
            </div>
          </a>

          <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden flex-grow pt-2 justify-between">
            <div className="flex flex-col  space-y-1 mx-1 lg:mt-1 ">
              <div className="px-5 pt-4 hidden lg:block">
                <div className="flex flex-row items-center">
                  <div className="text-xs font-bold tracking-wide text-gray-600">Menu</div>
                </div>
              </div>
              <a
                className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer "
                href="/app"
              >
                <span className="inline-flex justify-center items-center ml-3.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M10.894 22h2.212c3.447 0 5.17 0 6.345-1.012s1.419-2.705 1.906-6.093l.279-1.937c.38-2.637.57-3.956.029-5.083s-1.691-1.813-3.992-3.183l-1.385-.825C14.2 2.622 13.154 2 12 2s-2.199.622-4.288 1.867l-1.385.825c-2.3 1.37-3.451 2.056-3.992 3.183s-.35 2.446.03 5.083l.278 1.937c.487 3.388.731 5.081 1.906 6.093S7.447 22 10.894 22"
                      opacity=".5"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M9.447 15.397a.75.75 0 0 0-.894 1.205A5.77 5.77 0 0 0 12 17.75a5.77 5.77 0 0 0 3.447-1.148a.75.75 0 0 0-.894-1.205A4.27 4.27 0 0 1 12 16.25a4.27 4.27 0 0 1-2.553-.853"
                    ></path>
                  </svg>
                </span>
                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">App</span>
              </a>
              <a
                className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer "
                href="/app/blogs"
              >
                <span className="inline-flex justify-center items-center ml-3.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.25rem"
                    height="1.25rem"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g opacity="0.50">
                      <path
                        d="M21 8H13C12.7348 8 12.4804 7.89464 12.2929 7.70711C12.1054 7.51957 12 7.26522 12 7C12 6.73478 12.1054 6.48043 12.2929 6.29289C12.4804 6.10536 12.7348 6 13 6H21C21.2652 6 21.5196 6.10536 21.7071 6.29289C21.8946 6.48043 22 6.73478 22 7C22 7.26522 21.8946 7.51957 21.7071 7.70711C21.5196 7.89464 21.2652 8 21 8ZM21 12H13C12.7348 12 12.4804 11.8946 12.2929 11.7071C12.1054 11.5196 12 11.2652 12 11C12 10.7348 12.1054 10.4804 12.2929 10.2929C12.4804 10.1054 12.7348 10 13 10H21C21.2652 10 21.5196 10.1054 21.7071 10.2929C21.8946 10.4804 22 10.7348 22 11C22 11.2652 21.8946 11.5196 21.7071 11.7071C21.5196 11.8946 21.2652 12 21 12Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M21 16H3C2.73478 16 2.48043 15.8946 2.29289 15.7071C2.10536 15.5196 2 15.2652 2 15C2 14.7348 2.10536 14.4804 2.29289 14.2929C2.48043 14.1054 2.73478 14 3 14H21C21.2652 14 21.5196 14.1054 21.7071 14.2929C21.8946 14.4804 22 14.7348 22 15C22 15.2652 21.8946 15.5196 21.7071 15.7071C21.5196 15.8946 21.2652 16 21 16ZM13 20H3C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19C2 18.7348 2.10536 18.4804 2.29289 18.2929C2.48043 18.1054 2.73478 18 3 18H13C13.2652 18 13.5196 18.1054 13.7071 18.2929C13.8946 18.4804 14 18.7348 14 19C14 19.2652 13.8946 19.5196 13.7071 19.7071C13.5196 19.8946 13.2652 20 13 20Z"
                        fill="currentColor"
                      ></path>
                    </g>
                    <rect x="2" y="4" width="8" height="8" rx="2" fill="currentColor"></rect>
                  </svg>
                </span>
                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">Blogs</span>
              </a>
              <a
                className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer "
                href="/app/clients"
              >
                <span className="inline-flex justify-center items-center ml-3.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M24 5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-6.766 2.464l-1.537 1.28c-1.026.856-1.738 1.447-2.34 1.834c-.582.375-.977.5-1.357.5s-.774-.125-1.357-.5c-.601-.386-1.314-.978-2.34-1.834L5.928 6.765a.825.825 0 0 0-1.056 1.268l2.416 2.014c.975.812 1.765 1.47 2.463 1.92c.726.466 1.434.762 2.25.762c.814 0 1.522-.296 2.249-.763c.697-.448 1.487-1.107 2.462-1.92l1.666-1.388a4.5 4.5 0 0 1-1.144-1.194"
                    ></path>
                    <path fill="currentColor" d="M18.454 6.587a.825.825 0 0 1 .958.959a3 3 0 0 1-.958-.959"></path>
                    <path
                      fill="currentColor"
                      d="M16.958 3.021C16.156 3 15.244 3 14.2 3H9.8C5.652 3 3.577 3 2.289 4.318S1 7.758 1 12s0 6.364 1.289 7.682S5.652 21 9.8 21h4.4c4.148 0 6.223 0 7.511-1.318S23 16.242 23 12c0-1.067 0-2-.02-2.82a4.4 4.4 0 0 1-1.98.468c-2.485 0-4.5-2.06-4.5-4.603c0-.726.165-1.413.458-2.024"
                      opacity=".5"
                    ></path>
                  </svg>
                </span>
                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">Mail</span>
              </a>
              <a
                className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold bg-primary-50 shadow-sm text-primary-400 font-bold "
                href="/app/projects"
              >
                <span className="inline-flex justify-center items-center ml-3.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M2 12c0 5.523 4.477 10 10 10h9.25a.75.75 0 0 0 0-1.5h-3.98A9.99 9.99 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12"
                      opacity=".5"
                    ></path>
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M12 15.75a3.75 3.75 0 1 1 0-7.5a3.75 3.75 0 0 1 0 7.5"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M5.5 13a1 1 0 1 0 0-2a1 1 0 0 0 0 2M12 4.5a1 1 0 1 1 0 2a1 1 0 0 1 0-2m1 14a1 1 0 1 0-2 0a1 1 0 0 0 2 0m5.5-5.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                    ></path>
                  </svg>
                </span>
                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">projects</span>
              </a>
            </div>
            <div className="flex flex-col  space-y-1 mx-1 lg:mt-1 ">
              <a
                className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer "
                href="/settings"
              >
                <span className="inline-flex justify-center items-center ml-3.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2 2 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.62 1.62 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.03 2.03 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361s-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a2 2 0 0 0-.399 1.479c.053.394.287.798.757 1.605s.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2 2 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a2 2 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361s.306-1.064.782-1.36c.324-.203.533-.364.682-.556a2 2 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605s-.704-1.21-1.022-1.453a2.03 2.03 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.62 1.62 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2 2 0 0 0-1.09-1.083"
                      clip-rule="evenodd"
                      opacity=".5"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M15.523 12c0 1.657-1.354 3-3.023 3s-3.023-1.343-3.023-3S10.83 9 12.5 9s3.023 1.343 3.023 3"
                    ></path>
                  </svg>
                </span>
                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">Settings</span>
              </a>
            </div>
          </div>
          <div className="px-1">
            <div className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer text-red-400 hover:text-red-600">
              <span className="inline-flex justify-center items-center ml-3.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M15 2h-1c-2.828 0-4.243 0-5.121.879C8 3.757 8 5.172 8 8v8c0 2.828 0 4.243.879 5.121C9.757 22 11.172 22 14 22h1c2.828 0 4.243 0 5.121-.879C21 20.243 21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121C19.243 2 17.828 2 15 2"
                    opacity=".6"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M8 8c0-1.538 0-2.657.141-3.5H8c-2.357 0-3.536 0-4.268.732S3 7.143 3 9.5v5c0 2.357 0 3.535.732 4.268S5.643 19.5 8 19.5h.141C8 18.657 8 17.538 8 16z"
                    opacity=".4"
                  ></path>
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M4.47 11.47a.75.75 0 0 0 0 1.06l2 2a.75.75 0 0 0 1.06-1.06l-.72-.72H14a.75.75 0 0 0 0-1.5H6.81l.72-.72a.75.75 0 1 0-1.06-1.06z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <span onClick={LogOutHandler} className="ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 bg-white"></div>
    </div>
  );
};

export default MainHeader;
