import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Cronuseo } from "cronuseo";
import { ICheckRequest } from "cronuseo/build/main/check/check";
export type CheckRequest = {
  identifier?: string;
  resource: string;
  action: string;
};

const Check = async (checkReq: CheckRequest) : Promise<boolean> => {
    
  const cronuseo = new Cronuseo({
    checkUrl: "http://localhost:8081",
    apiKey: process.env.CRONUSEO_API_KEY!,
  });
  const session = await getServerSession(options);
  const checkRequest: ICheckRequest = {
    identifier: session.user.id,
    resource: checkReq.resource,
    action: checkReq.action
  }
  return await cronuseo.check(checkRequest)
};

export default Check;
