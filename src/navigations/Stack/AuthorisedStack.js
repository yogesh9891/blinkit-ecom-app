import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SingIn from '../../components/SingIn';
import Otpverification from '../../components/Otpverification';
import Categorypage from '../../components/Categorypage';
import Profilesetting from '../../components/Profilesetting';
import Categories from '../../components/Categories';
import ProductDetails from '../../components/ProductDetails';
import Profile from '../../components/Profile';
import Address from '../../components/Address';
import Mysubcriprtion from '../../components/Mysubcriprtion';
import Vacations from '../../components/Vacations';
import Addvacation from '../../components/Addvacation';
import Order from '../../components/Order';
import Orderprosser from '../../components/Orderprosser';
import Ordersummary from '../../components/Ordersummary';
import OrderId from '../../components/OrderId';
import OrderArriving from '../../components/OrderArriving';
import Addnewaddress from '../../components/Addnewaddress';
import Savenewaddress from '../../components/Savenewaddress';
import Showaddress from '../../components/Showaddress';
import Norefunds from '../../components/Norefunds';
import Refunds from '../../components/Refunds';
import Notifiction from '../../components/Notifiction';
import Generalinfo from '../../components/Generalinfo';
import Managereferrals from '../../components/Managereferrals';
import Faq from '../../components/Faq';
import Addressmap from '../../components/Addressmap';
import SaveLocation from '../../components/SaveLocation';
import ProductNotifiction from '../../components/ProductNotifiction';
import Applycoupon from '../../components/Applycoupon';
import Cart from '../../components/Cart';
import PaymentOption from '../../components/PaymentOption';
import Home from '../../components/Home';
import StationeryHome from '../../components/StationeryHome';
import Addvacationdate from '../../components/Addvacationdate';
import SubCategories from '../../components/SubCategories';
import Subscription from '../../components/Subscription';
import Wallet from '../../components/Wallet';
import Walletsuccessful from '../../components/Walletsuccessful';
import BottomTabNav from '../tab/BottomTabNav';
import ProductList from '../../components/ProductList';
import Editvacation from '../../components/Editvacation';
import SubscriptionCheckout from '../../components/SubscriptionCheckout';
import EditMapAddress from '../../components/EditMapAddress';
const Stack = createNativeStackNavigator();
export default function AuthorisedStack() {
  return (
    <Stack.Navigator initialRouteName="BottomTabNav">
      {/* <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
          name="Categorypage" component={Categorypage}
        /> */}

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Walletsuccessful"
        component={Walletsuccessful}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="SubscriptionCheckout"
        component={SubscriptionCheckout}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="OrderArriving"
        component={OrderArriving}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'Wallet',
        }}
        name="Wallet"
        component={Wallet}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Profilesetting"
        component={Profilesetting}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="ProductList"
        component={ProductList}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Mysubcriprtion"
        component={Mysubcriprtion}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Addvacationdate"
        component={Addvacationdate}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="BottomTabNav"
        component={BottomTabNav}
      />

      {/* <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
          name="Subscription" component={Subscription}
        /> */}
      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="SubCategories"
        component={SubCategories}
      />
      {/* <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
          name="Home" component={Home}
        /> */}

      {/* <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
          name="Categories" component={Categories}
        /> */}

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="PaymentOption"
        component={PaymentOption}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Cart"
        component={Cart}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Applycoupon"
        component={Applycoupon}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="ProductDetails"
        component={ProductDetails}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="ProductNotifiction"
        component={ProductNotifiction}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="SaveLocation"
        component={SaveLocation}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Addressmap"
        component={Addressmap}
      />

<Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="EditMapAddress"
        component={EditMapAddress}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Faq"
        component={Faq}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Managereferrals"
        component={Managereferrals}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Generalinfo"
        component={Generalinfo}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Notifiction"
        component={Notifiction}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Refunds"
        component={Refunds}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Norefunds"
        component={Norefunds}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Showaddress"
        component={Showaddress}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Savenewaddress"
        component={Savenewaddress}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Addnewaddress"
        component={Addnewaddress}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="OrderId"
        component={OrderId}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Ordersummary"
        component={Ordersummary}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal',
        }}
        name="Orderprosser"
        component={Orderprosser}
      />
        <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
          name="Order" component={Order}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
          name="Addvacation" component={Addvacation}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
          name="Editvacation" component={Editvacation}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
          name="Vacations" component={Vacations}
        />



        <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
          name="Address" component={Address}
        />



        <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
          name="Profile" component={Profile}
        />






       




        {/* <Stack.Screen
        options={{
          headerShown: false,
          gestureDirection: 'horizontal', }}
        name="Sidebar" component={Sidebar}
      /> */}
    </Stack.Navigator>
  );
}
