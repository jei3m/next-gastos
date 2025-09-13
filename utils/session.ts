import { authClient } from "@/lib/auth-client";

export async function fetchSession() {
    const { data: session, error } = await authClient.getSession();
    return { session, error};
};