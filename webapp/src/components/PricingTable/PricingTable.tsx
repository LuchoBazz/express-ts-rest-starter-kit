// reference: https://tailwindflex.com/@andreas-wagner/pricing-comparison-table
// https://tailwindflex.com/@shariful-islam/pricing-table-8

import { useEffect, useState } from "react";
import useSubscriptionPlans from "../../core/hooks/subscription-plans.hook";
import type { OfferingItemBackend, SubscriptionPlanBackend } from "../../core/entities/subscription_plans.entity";

const PricingTable = () => {
  const { fetchSubscriptionPlan } = useSubscriptionPlans();
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlanBackend[]>([]);

  const getSubscriptionPlan = async (): Promise<void> => {
    const fetchedSubscriptionPlans = await fetchSubscriptionPlan();
    setSubscriptionPlans(fetchedSubscriptionPlans);
  };

  useEffect(() => {
    getSubscriptionPlan();
  }, []);

  console.log(JSON.stringify(subscriptionPlans));

  return (
    <div className="flex items-center justify-center h-screen m-[55px]">
      <div className="flex">
        {subscriptionPlans.map((subscriptionPlan: SubscriptionPlanBackend) => {
          return (
            <div className="border border-gray-300 rounded-[20px] p-[clamp(20px,2.5vw,30px)] flex flex-col justify-between w-[310px] bg-white transition-transform ease-in-out duration-700 delay-200 opacity-100 translate-x-0">
              <div className="space-y-[clamp(8px,2.5vw,10px)]">
                <div className="flex gap-2 items-center">
                  {subscriptionPlan.final_price > 0 ? (
                    <>
                      <span className="font-bold text-black text-[clamp(30px,2.5vw,45px)]">
                        $ {subscriptionPlan.final_price}
                      </span>
                      <span className="line-through text-gray-500 text-[clamp(15px,2.5vw,20px)]">
                        $ {subscriptionPlan.price}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-black text-[clamp(30px,2.5vw,45px)]">Free</span>
                  )}
                </div>
                <div className="space-y-[clamp(15px,2.5vw,20px)]">
                  <div className="space-y-2.5">
                    <h1 className="font-semibold text-[clamp(20px,2.5vw,27px)]">{subscriptionPlan.name}</h1>
                    <p className="text-gray-500 text-[clamp(12px,2.5vw,15px)]">{subscriptionPlan.description}</p>
                  </div>
                  <span className="bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 ...">
                    {subscriptionPlan.billing_cycle}
                  </span>

                  <ul className="space-y-2.5">
                    {subscriptionPlan.features.offerings.included.map((item: OfferingItemBackend) => {
                      return (
                        <li className="flex items-center gap-2.5">
                          <div className="rounded-full w-[18px] h-[18px] bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                            ✔
                          </div>
                          <span className="text-gray-600 text-base">{item.name}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {subscriptionPlan.features.offerings.not_included.length > 0 ? (
                    <div className="bg-gray-500 text-white rounded-full flex items-center justify-center py-1 px-4 w-min text-sm font-medium">
                      Without
                    </div>
                  ) : (
                    <></>
                  )}

                  <ul className="space-y-2.5">
                    {subscriptionPlan.features.offerings.not_included.map((item: OfferingItemBackend) => {
                      return (
                        <li className="flex items-center gap-2.5">
                          <div className="rounded-full w-[18px] h-[18px] bg-gray-500 flex items-center justify-center text-white text-xs font-bold">
                            ✖️
                          </div>
                          <span className="text-gray-600 text-base">{item.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => (window.location.href = subscriptionPlan.href || "#")}
                className={`mt-5 w-full py-3 bg-${subscriptionPlan.features.call_to_action.color}-600 text-white text-lg font-medium rounded-full flex items-center justify-center gap-2 hover:bg-${subscriptionPlan.features.call_to_action.color}-700 transition`}
              >
                <span className="text-white">{subscriptionPlan.features.call_to_action.emoji}</span>{" "}
                {subscriptionPlan.features.call_to_action.text}
              </button>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
};

export default PricingTable;

/*
<div className="flex items-center justify-center h-screen">
  <div className="flex">
    <div className="border border-gray-300 rounded-[20px] p-[clamp(20px,2.5vw,30px)] flex flex-col justify-between w-[310px] bg-white transition-transform ease-in-out duration-700 delay-200 opacity-100 translate-x-0">
      <div className="space-y-[clamp(8px,2.5vw,10px)]">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-black text-[clamp(30px,2.5vw,45px)]">Free</span>
        </div>
        <div className="space-y-[clamp(15px,2.5vw,20px)]">
          <div className="space-y-2.5">
            <h1 className="font-semibold text-[clamp(20px,2.5vw,27px)]">Basic</h1>
            <p className="text-gray-500 text-[clamp(12px,2.5vw,15px)]">
              For most businesses that want to optimize web queries
            </p>
          </div>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✔
              </div>
              <span className="text-gray-600 text-base">Customer Panel</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✔
              </div>
              <span className="text-gray-600 text-base">Admin Panel</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✔
              </div>
              <span className="text-gray-600 text-base">Mega Menu</span>
            </li>
          </ul>
        </div>
      </div>
      <button className="mt-5 w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-full flex items-center justify-center gap-2 hover:bg-blue-700 transition">
        🔓
        <span className="text-primary text-[clamp(12px,2.5vw,16px)] group-hover:text-white">Subscribe Now</span>
      </button>
    </div>

    <div className="border border-gray-300 rounded-[20px] p-[clamp(20px,2.5vw,30px)] flex flex-col justify-between w-[310px] bg-white transition-transform ease-in-out duration-700 delay-200 opacity-100 translate-x-0">
      <div className="space-y-[clamp(8px,2.5vw,10px)]">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-black text-[clamp(30px,2.5vw,45px)]">$95</span>
          <span className="line-through text-gray-500 text-[clamp(15px,2.5vw,20px)]">$100</span>
        </div>
        <div className="space-y-[clamp(15px,2.5vw,20px)]">
          <div className="space-y-2.5">
            <h1 className="font-semibold text-[clamp(20px,2.5vw,27px)]">Commercial</h1>
            <p className="text-gray-500 text-[clamp(12px,2.5vw,15px)]">
              For most businesses that want to optimize web queries
            </p>
          </div>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✔
              </div>
              <span className="text-gray-600 text-base">Customer Panel</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✔
              </div>
              <span className="text-gray-600 text-base">Admin Panel</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✔
              </div>
              <span className="text-gray-600 text-base">Mega Menu</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✔
              </div>
              <span className="text-gray-600 text-base">Quick View</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✔
              </div>
              <span className="text-gray-600 text-base">Quick Order</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ✔
              </div>
              <span className="text-gray-600 text-base">Live Message</span>
            </li>
          </ul>
          <div className="bg-green-500 text-white rounded-full flex items-center justify-center py-1 px-4 w-min text-sm font-medium">
            Included
          </div>
          <div className="flex items-center gap-2.5">
            <div className="rounded-full w-[18px] h-[18px] bg-green-500 flex items-center justify-center text-white text-xs font-bold">
              ✔
            </div>
            <span className="text-gray-600 text-base">Commercial use permission</span>
          </div>
        </div>
      </div>
      <button className="mt-5 w-full py-3 bg-green-600 text-white text-lg font-medium rounded-full flex items-center justify-center gap-2 hover:bg-green-700 transition">
        <span className="text-white">🛒</span> Purchase Now
      </button>
    </div>

    <div className="md:-ml-5 border border-black-10 rounded-[20px] p-[clamp(20px,2.5vw,30px)] flex justify-between flex-col w-[310px] h-[580px] transition-transform duration-700 ease-in-out delay-200 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-100 translate-x-0">
      <div className="space-y-[clamp(8px,2.5vw,10px)] text-white">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-[clamp(30px,2.5vw,45px)]">$50</span>
          <span className="line-through text-[clamp(15px,2.5vw,20px)]">$60</span>
        </div>
        <div className="space-y-[clamp(15px,2.5vw,20px)]">
          <div className="space-y-2.5">
            <h1 className="font-semibold text-[clamp(20px,2.5vw,27px)]">Personal</h1>
            <p className="text-[clamp(12px,2.5vw,15px)]">For most businesses that want to optimize web queries</p>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-white flex items-center justify-center">✔</div>
              <span className="text-base">Customer Panel</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-white flex items-center justify-center">✔</div>
              <span className="text-base">Admin Panel</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-white flex items-center justify-center">✔</div>
              <span className="text-base">Mega Menu</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-white flex items-center justify-center">✔</div>
              <span className="text-base">Quick View</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-white flex items-center justify-center">✔</div>
              <span className="text-base">Quick Order</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="rounded-full w-[18px] h-[18px] bg-white flex items-center justify-center">✔</div>
              <span className="text-base">Live Message</span>
            </div>
          </div>
        </div>
      </div>

      <button className="font-medium mt-5 text-black justify-center px-5 py-2 bg-white rounded-full flex items-center gap-2 group transition duration-300 hover:bg-indigo-600">
        🛍️
        <span className="text-primary text-[clamp(12px,2.5vw,16px)] group-hover:text-white">Purchase Now</span>
      </button>
    </div>
  </div>
*/
