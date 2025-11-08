import { CreateAccount, EditAccount } from "@/types/accounts.types";

export const fetchAccounts = async () => {
    try {
        const res = await fetch('/api/accounts');
        const data = await res.json();
        return(data.data)
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        };
        throw Error('Failed to Fetch Accounts');
    }
};

export const fetchAccountByID = async (uuid:string) => {
    try {
        const res = await fetch(`/api/accounts/${uuid}`);
        const data = await res.json();
        return(data.data)
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        };
        throw Error('Failed to Fetch Account');
    }
};

export const createAccount = async (account: CreateAccount) => {
    try {
        const res = await fetch('/api/accounts',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(account)
        });
        const data = await res.json();
        if (!res.ok) throw Error(data.message);
        return data.data  ;
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        };
        throw Error('Failed to Create Account');
    };
};

export const editAccount = async (uuid: string, account: EditAccount) => {
    try {
        const res = await fetch(`/api/accounts/${uuid}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(account)
        });
        const data = await res.json();
        if (!res.ok) throw Error(data.message);
        return data.data;
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message);
        };
        throw Error('Failed to Edit Account')
    }
};

export const deleteAccount = async (uuid: string) => {
    try {
        const res = await fetch(`/api/accounts/${uuid}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await res.json();
        if (!res.ok) throw Error(data.message);
        return data.data;
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message);
        };
        throw Error('Failed to Delete Account');
    };
};