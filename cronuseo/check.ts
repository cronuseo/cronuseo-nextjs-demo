import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export type CheckRequest = {
  identifier?: string;
  resource: string;
  action: string;
};

const Check = async (checkReq: CheckRequest) : Promise<boolean> => {
    
  const session = await getServerSession(options);
  checkReq.identifier = session.user.id
  const response = await fetch("http://localhost:8081/api/v1/o/super/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      API_KEY: process.env.CRONUSEO_API_KEY!,
    },
    body: JSON.stringify(checkReq),
  });
  const allow = await response.json();
  return allow.allowed
};

export default Check;
