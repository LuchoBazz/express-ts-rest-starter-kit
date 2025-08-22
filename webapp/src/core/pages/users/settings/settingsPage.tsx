import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainHeader from "../../../../components/MainHeader/MainHeader";
import useUpdateUser from "../../../hooks/update-user.hook";
import useUserLoggedIn from "../../../hooks/user-loggued-in.hook";
import useRefreshToken from "../../../hooks/refresh-token.hook";
import SessionLimitList from "../../../../components/SessionLimitList/SessionLimitList";

// Refence: https://tailwindcss.com/plus/ui-blocks/application-ui/forms/form-layouts

const SettingsPage = () => {
  const { updateUser } = useUpdateUser();
  const { refreshToken } = useRefreshToken();
  const navigate = useNavigate();

  const { fetchUser } = useUserLoggedIn();
  const token = localStorage.getItem("token");

  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUserName] = useState<string>("");

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLastName(e.target.value);
  };

  const handleSave = async () => {
    await updateUser({ email, first_name: firstName, last_name: lastName });
    const newToken = await refreshToken(token!);
    localStorage.setItem("token", newToken ?? token ?? "");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const getUser = async (): Promise<void> => {
    const fetchedUser = await fetchUser(token!);
    setEmail(fetchedUser?.email ?? "");
    setFirstName(fetchedUser?.first_name ?? "");
    setLastName(fetchedUser?.last_name ?? "");
    setUserName(fetchedUser?.username ?? "");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex gap-8 h-screen overflow-hidden">
      <div className="w-1/4">
        <MainHeader />
      </div>

      <div className="w-3/4 m-[30px] overflow-y-auto h-full">
        <div className="m-2 mb-20">
          {" "}
          {/*form*/}
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Welcome to your profile. Here you can view and manage your personal information, settings, and
                preferences.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                        localhost:5173/profile/
                      </div>
                      <input
                        id="username"
                        name="username"
                        value={username}
                        type="text"
                        disabled
                        placeholder="username"
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="first-name"
                      value={firstName}
                      type="text"
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm/6"
                      onChange={handleChangeFirstName}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last-name"
                      value={lastName}
                      type="text"
                      autoComplete="family-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm/6"
                      onChange={handleChangeLastName}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      value={email}
                      name="email"
                      type="email"
                      autoComplete="email"
                      disabled
                      className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-500 border border-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                    Country
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="country"
                      name="country"
                      disabled
                      autoComplete="country-name"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-200 py-1.5 pr-8 pl-3 text-base text-gray-600 border border-gray-300 placeholder:text-gray-400 sm:text-sm/6 cursor-not-allowed"
                    >
                      <option>N/A</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      id="street-address"
                      name="street-address"
                      type="text"
                      value="N/A"
                      disabled
                      autoComplete="street-address"
                      className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-600 border border-gray-300 placeholder:text-gray-400 sm:text-sm/6 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      value="N/A"
                      disabled
                      type="text"
                      autoComplete="address-level2"
                      className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-600 border border-gray-300 placeholder:text-gray-400 sm:text-sm/6 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      id="region"
                      name="region"
                      value="N/A"
                      disabled
                      type="text"
                      autoComplete="address-level1"
                      className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-600 border border-gray-300 placeholder:text-gray-400 sm:text-sm/6 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      id="postal-code"
                      name="postal-code"
                      value="N/A"
                      disabled
                      type="text"
                      autoComplete="postal-code"
                      className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-600 border border-gray-300 placeholder:text-gray-400 sm:text-sm/6 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Notifications</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                We'll always let you know about important changes, but you pick what else you want to hear about.
              </p>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm/6 font-semibold text-gray-900">By email</legend>
                  <div className="mt-6 space-y-6">
                    <div className="flex gap-3">
                      <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            aria-describedby="comments-description"
                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                          />
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-checked:opacity-100"
                            />
                            <path
                              d="M3 7H11"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-indeterminate:opacity-100"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-sm/6">
                        <label htmlFor="comments" className="font-medium text-gray-900">
                          Comments
                        </label>
                        <p id="comments-description" className="text-gray-500">
                          Get notified when someones posts a comment on a posting.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-sm/6 font-semibold text-gray-900">Push notifications</legend>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    These notifications will be sent to your email address.
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label htmlFor="push-everything" className="block text-sm/6 font-medium text-gray-900">
                        Everything
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label htmlFor="push-email" className="block text-sm/6 font-medium text-gray-900">
                        Same as email
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        defaultChecked
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label htmlFor="push-nothing" className="block text-sm/6 font-medium text-gray-900">
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm/6 font-semibold text-gray-900" onClick={handleCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
        <SessionLimitList />
      </div>
    </div>
  );
};

export default SettingsPage;
