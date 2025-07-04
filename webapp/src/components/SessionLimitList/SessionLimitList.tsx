import SessionLimitCard from "../SessionLimitCard/SessionLimitCard";

// Reference: https://tailwindflex.com/@livia-flores/contact-information-section

const SessionLimitList = () => {
  return (
    <div>
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Location</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              🔒 Maximum Sessions Reached
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              You've reached the limit of 3 active sessions. To sign in on a new device, please close one of your
              current sessions first. Actions you can take
            </p>
          </div>

          <div className="mt-4 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-lg font-medium text-indigo-600 hover:underline">
              📌 Sign out from all sessions
            </a>
          </div>
        </div>
      </div>
      <SessionLimitCard />
      <SessionLimitCard />
      <SessionLimitCard />
    </div>
  );
};

export default SessionLimitList;
