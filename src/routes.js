import Login from './components/Account/Login.vue'
import refresh from './components/refresh.vue'
import Home from './components/Home.vue'
import menuList from './components/Administrative/system/menu/list.vue'
import menuAdd from './components/Administrative/system/menu/add.vue'
import menuEdit from './components/Administrative/system/menu/edit.vue'
import systemConfig from './components/Administrative/system/config/add.vue'
import ruleList from './components/Administrative/system/rule/list.vue'
import ruleAdd from './components/Administrative/system/rule/add.vue'
import ruleEdit from './components/Administrative/system/rule/edit.vue'
import positionList from './components/Administrative/structures/position/list.vue'
import positionAdd from './components/Administrative/structures/position/add.vue'
import positionEdit from './components/Administrative/structures/position/edit.vue'
import structuresList from './components/Administrative/structures/structures/list.vue'
import structuresAdd from './components/Administrative/structures/structures/add.vue'
import structuresEdit from './components/Administrative/structures/structures/edit.vue'
import groupsList from './components/Administrative/structures/groups/list.vue'
import groupsAdd from './components/Administrative/structures/groups/add.vue'
import groupsEdit from './components/Administrative/structures/groups/edit.vue'
import usersList from './components/Administrative/personnel/users/list.vue'
import usersAdd from './components/Administrative/personnel/users/add.vue'
import usersEdit from './components/Administrative/personnel/users/edit.vue'
import booksList from './components/Administrative/personnel/books/list.vue'
import booksAdd from './components/Administrative/personnel/books/add.vue'
import booksEdit from './components/Administrative/personnel/books/edit.vue'
import booksInfo from './components/Administrative/personnel/books/info.vue'
import cateList from './components/Administrative/personnel/cate/list.vue'
import cateAdd from './components/Administrative/personnel/cate/add.vue'
import cateEdit from './components/Administrative/personnel/cate/edit.vue'
import cateInfo from './components/Administrative/personnel/cate/info.vue'
import borrowList from './components/Administrative/personnel/borrow/list.vue'
import borrowInfo from './components/Administrative/personnel/borrow/info.vue'

/**
 * meta参数解析
 * hideLeft: 是否隐藏左侧菜单，单页菜单为true
 * module: 菜单所属模块
 * menu: 所属菜单，用于判断三级菜单是否显示高亮，如菜单列表、添加菜单、编辑菜单都是'menu'，用户列表、添加用户、编辑用户都是'user'，如此类推
 */

const routes = [
  { path: '/', component: Login, name: 'Login' },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/refresh', component: refresh, name: 'refresh' }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'menu/list', component: menuList, name: 'menuList', meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }},
      { path: 'menu/add', component: menuAdd, name: 'menuAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }},
      { path: 'menu/edit/:id', component: menuEdit, name: 'menuEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'config/add', component: systemConfig, name: 'systemConfig', meta: { hideLeft: false, module: 'Administrative', menu: 'systemConfig' }}
    ]
  },

  {
    path: '/home',
    component: Home,
    children: [
      { path: 'rule/list', component: ruleList, name: 'ruleList', meta: { hideLeft: false, module: 'Administrative', menu: 'rule' }},
      { path: 'rule/add', component: ruleAdd, name: 'ruleAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'rule' }},
      { path: 'rule/edit/:id', component: ruleEdit, name: 'ruleEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'rule' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'position/list', component: positionList, name: 'positionList', meta: { hideLeft: false, module: 'Administrative', menu: 'position' }},
      { path: 'position/add', component: positionAdd, name: 'positionAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'position' }},
      { path: 'position/edit/:id', component: positionEdit, name: 'positionEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'position' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'structures/list', component: structuresList, name: 'structuresList', meta: { hideLeft: false, module: 'Administrative', menu: 'structures' }},
      { path: 'structures/add', component: structuresAdd, name: 'structuresAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'structures' }},
      { path: 'structures/edit/:id', component: structuresEdit, name: 'structuresEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'structures' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'groups/list', component: groupsList, name: 'groupsList', meta: { hideLeft: false, module: 'Administrative', menu: 'groups' }},
      { path: 'groups/add', component: groupsAdd, name: 'groupsAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'groups' }},
      { path: 'groups/edit/:id', component: groupsEdit, name: 'groupsEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'groups' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'users/list', component: usersList, name: 'usersList', meta: { hideLeft: false, module: 'Administrative', menu: 'users' }},
      { path: 'users/add', component: usersAdd, name: 'usersAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'users' }},
      { path: 'users/edit/:id', component: usersEdit, name: 'usersEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'users' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'books/list', component: booksList, name: 'booksList', meta: { hideLeft: false, module: 'Administrative', menu: 'books' }},
      { path: 'books/add', component: booksAdd, name: 'booksAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'books' }},
      { path: 'books/edit/:id', component: booksEdit, name: 'booksEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'books' }},
      { path: 'books/info', component: booksInfo, name: 'booksInfo', meta: { hideLeft: false, module: 'Administrative', menu: 'books' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'cate/list', component: cateList, name: 'cateList', meta: { hideLeft: false, module: 'Administrative', menu: 'cate' }},
      { path: 'cate/add', component: cateAdd, name: 'cateAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'cate' }},
      { path: 'cate/edit/:id', component: cateEdit, name: 'cateEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'cate' }},
      { path: 'cate/info', component: cateInfo, name: 'cateInfo', meta: { hideLeft: false, module: 'Administrative', menu: 'cate' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'borrow/list', component: borrowList, name: 'borrowList', meta: { hideLeft: false, module: 'Administrative', menu: 'borrow' }},
      { path: 'borrow/info', component: borrowInfo, name: 'borrowInfo', meta: { hideLeft: false, module: 'Administrative', menu: 'borrow' }}
    ]
  }
]
export default routes
