// 专属状态管理库  Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态
import {defineStore} from "pinia";
import {login,getUserInfo} from "@/api/auth"

//2.定义store的类型
export interface IUserState {
    token: string,
    username: string,
    avatar_url: string,
    permissions: string[],
    info: any
}

export const useUserStore = defineStore({
    //1.store的名称
    id: 'app-user',
    //定义用户的状态   :IUserState指定类型
    state: ():IUserState=>({
        //index.vue登录保存的状态  拿本地的token如果拿到了就给他，拿不到就给空
        token: localStorage.getItem('token') || '',
        //用户名
        username: '',
        //用户的头像
        avatar_url: '',
        //权限
        permissions: [],
        //用户信息
        info: {}
    }),
    //获取    都是拿的state里面的
    getters:{
        getToken():string {
            return this.token
        },
        getUsername():string{
            return this.username
        },
        getAvatarUrl():string {
            return this.avatar_url
        },
        getPermissions():string[]{
            return this.permissions
        }
    },
    actions: {
        //设置  当调用setToken的时候说明已经登陆并且已经获取到了用户的token了
        setToken(token: string){
            //在本地存储中存储token
            localStorage.setItem('token',token)
            //在状态中保存token 把setToken里面的token赋给this.token
            this.token = token;
        },
        setAvatar(avatar_url:string){
            this.avatar_url = avatar_url;
        },
        setUserInfo(info:object){
            this.info = info;
        },
        setUserName(username:string){
            this.username = username;
        },
        setPermissions(permissions:string[]){
            this.permissions = permissions
        },
        //异步登录的方法 走的是请求API里的
        //login是状态管理的
        async login(userInfo: object) {
            try {
                //login就是上面导入的login
                const response: any  = await login(userInfo)//userInfo传给data
                console.log(response)
                //access_token 认证Api登录里的    从response里面拿access_token

                if(response.access_token){
                    //把access_token传给了setToken
                    this.setToken(response.access_token);
                    //登录之后，token已经拿到了，然后getUser获取调用
                    return await this.getUser();
                }
            }catch (error){
                // console.log(error)
            }
        },
        async getUser() {
            // await useUserStore.getUser()
            try {
                const response: any = await getUserInfo();
                this.setUserInfo(response);
                this.setAvatar(response.avatar_url);
                this.setUserName(response.name);
                return response;
            } catch (error) {
                // console.log(error);
            }
        }
    }
})
