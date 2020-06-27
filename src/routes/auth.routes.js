import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StorePanel from '../pages/Store/Panel';
import StoreProfile from '../pages/Store/Profile';
import StoreProducts from '../pages/Store/Products';
import StoreProductEdit from '../pages/Store/Products/edit';
import StoreProductNew from '../pages/Store/Products/new';
import StoreLoadCategory from '../pages/Store/Products/loadCategory';
import StoreCategories from '../pages/Store/Categories';
import StoreCategoryEdit from '../pages/Store/Categories/edit';
import StoreCategoryNew from '../pages/Store/Categories/new';
import StoreOrders from '../pages/Store/Orders';
import StoreOrder from '../pages/Store/Orders/show';
import StoreDelivery from '../pages/Store/Orders/delivery';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="StorePanel" component={StorePanel}/>
        <AuthStack.Screen name="StoreProfile" component={StoreProfile}/>
        <AuthStack.Screen name="StoreProducts" component={StoreProducts}/>
        <AuthStack.Screen name="StoreProductEdit" component={StoreProductEdit}/>
        <AuthStack.Screen name="StoreProductNew" component={StoreProductNew}/>
        <AuthStack.Screen name="StoreLoadCategory" component={StoreLoadCategory}/>
        <AuthStack.Screen name="StoreCategories" component={StoreCategories}/>
        <AuthStack.Screen name="StoreCategoryEdit" component={StoreCategoryEdit}/>
        <AuthStack.Screen name="StoreCategoryNew" component={StoreCategoryNew}/>
        <AuthStack.Screen name="StoreOrders" component={StoreOrders}/>
        <AuthStack.Screen name="StoreOrder" component={StoreOrder}/>
        <AuthStack.Screen name="StoreDelivery" component={StoreDelivery}/>
    </AuthStack.Navigator>
)
export default AuthRoutes;