import { defineStore } from "pinia";
import NetworkHelper from "@/utils/networkHelper";
import { HTTPError } from "ky";
import { Notify } from "quasar";
import type { User } from "@/stores/interfaces";


const api = new NetworkHelper();

export type State = {
    users: User[];
    user: User;
};

export const useUserStore = defineStore({
    id: "users",
    state: () =>
        ({
        users: [],
        user: {} as User,
        } as State),
    getters: {
        // isAuthenticated: state => state._isAuthenticated,

    },
    actions: {
        async getUser(u: number) {
            const param = {
                'userId': u
            }
            this.user =await api.get<User>("src/index.php/user/getUser",param);  
        },
        async getUsers(){
            this.users.splice;
          const users = await api.get<User[]>("src/index.php/user/list");
          users.forEach(u => this.users.push(u));
        },
        async posttest(u :User)
        {
            api.post<User>("src/index.php/user/list", u);   
        },
        async saveUserChange(u: User)
        {
            api.post<User>("src/index.php/admin/save", u);
        },

        async resetPW(userId:number) {
            try {
                const param =
                {
                    "userId": userId,
                }
                const info = await api.get<boolean>("src/index.php/admin/pwreset", param);
                return info;
            }catch (err) {
                console.error(err);
                if (err instanceof HTTPError) {
                    Notify.create({ message: `HTTP Error: ${err.message}`, type: "negative" });
                }
            }
        }
    },
});
