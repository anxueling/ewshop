//控制台路由
//拿的数据模型
import {RouteRecordRaw} from "vue-router";
import Layout from "@/layout/index.vue";
import {renderIcon} from "@/utils"
import {Browsers} from "@vicons/ionicons5"

//定义一个routeName dashboard控制台
const routeName = "dashboard";
/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.sort 排序越小越排前
 */

//定义了一个数组Array 数组里面是路由格式
const routes: Array<RouteRecordRaw> = [
    {
        path: "/dashboard",
        name: routeName,//在上面统一定义了一下
        component: Layout,//指定的是布局 index
        //重定向 redirect  当跳转到dashboard就重定向到控制台子级路由就是下面的children
        redirect: "/dashboard/console",
        meta: {
            title: "首页统计",
            //左边小图标 如果菜单比较频繁就放到首页上边
            icon: renderIcon(Browsers),
            //排序
            sort: 0,
        },
        children: [
            {
                //子级路由
                path: "console",
                //上面有routeName = dashboard
                name: `${routeName}_console`,
                meta: {
                    title: "主控台",
                    icon: "",
                },
                //实际展示的页面
                component: () => import("@/views/dashboard/Dashboard.vue"),
            }
        ]
    }
];
export default routes;