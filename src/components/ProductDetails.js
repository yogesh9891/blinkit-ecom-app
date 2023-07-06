import {FlatList, Image, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import ExternalStyles from '../stylecomponents/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import CalendarPicker from 'react-native-calendar-picker';
import { WebView } from 'react-native-webview';
import {List} from 'react-native-paper';
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../ReusableComponents/Header';
import {useNavigation} from '@react-navigation/native';
import {getSingleStoreProduct} from '../services/product.service';
import {generateFilePath} from '../utils/file';
import {addToCartApi, getCartApi, removeQuantityinToCartApi, addQuantityinToCartApi} from '../services/cart.service';
import {toastError} from '../utils/toastError';

export default function ProductDetails(props) {
  const [toggle, setToggle] = useState(false);
  const [addtoggle, setaddToggle] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const navigation = useNavigation();
  const [disableAddBtn, setdisableAddBtn] = useState(props.route.params?.subscription ? props.route.params.subscription : false);
  const [subscriptionActive, setSubscriptionActive] = useState(props.route.params?.subscription ? props.route.params.subscription : false);
  const [planSelectEnabled, setPlanSelectEnabled] = useState(false);

  console.log(props.route.params, 'props.route.params');
  const [category, setCategory] = useState('');
  const [productStockId, setproductStockId] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [cartArr, setCartArr] = useState([]);
  const [product, setProduct] = useState([]);
  const [subscriptionQuantity, setSubscriptionQuantity] = useState(0);
  useEffect(() => {
    if (props.route.params?.productStockId) {
      setproductStockId(props.route.params.productStockId);
    } else {
      // navigation.navigate("AuthorisedStack")y
    }
  }, [props.route.params?.productStockId]);

  const getUserCart = async () => {
    try {
      let {data: res} = await getCartApi();
      if (res && res?.success) {
        setCartArr(res.data);
      }
    } catch (error) {
      console.error(error);
      // toastError(error)
    }
  };

  useEffect(() => {
    if (addtoggle) {
      getUserCart();
    }
  }, [addtoggle]);

  useEffect(() => {
    if (cartArr && cartArr.length > 0) {
      let carttotal = cartArr.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.quantity * currentValue.price;
      }, 0);
      console.log(cartArr, 'cartArrcartArr');
      if (cartArr) {
        let currentProduct = cartArr.find(el => `${el.productStockId}` == productStockId && `${el._id}` == product.productId && `${el.variantId}` == product.variantId);

        console.log(currentProduct, 'currentProduct');
        if (currentProduct) {
          setQuantity(currentProduct?.quantity);
        }
      }

      setTotal(carttotal);
    }
  }, [cartArr]);
  useEffect(() => {
    if (props.route.params?.category) {
      setCategory(props.route.params.category);
    } else {
      setCategory('');
    }
  }, [props.route.params?.category]);

  useEffect(() => {
    if (productStockId) {
      getProductDetails(productStockId);
      getUserCart();
      setaddToggle(false);
    }
  }, [productStockId]);

  useEffect(() => {
    console.log(quantity,"quantityquantityquantityquantity")
    if (quantity > 0) {
      setaddToggle(true);
    } else {
      setaddToggle(false);
    }
  }, [quantity]);

  const getProductDetails = async id => {
    try {
      let {data: res} = await getSingleStoreProduct(id);
      console.log('product-----------------------------', res.data.product.productObj.imageArr);
      if (res && res?.success) {
        setProduct(res.data);
      }
      return;
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  const handleSwitchInCartAndSubscription = () => {
    if (subscriptionActive) {
      setaddToggle(true);
      setSubscriptionQuantity(1)
    } else {
      handleAddToCart();
    }
  };

  const handleAddToCart = async () => {
    try {
      if (product) {
        let obj = {
          productId: product?.productId,
          variantId: product?.variantId,
          batchId: product?.batchId,
          sellerId: product?.orderedToId,
        };
        let {data: res} = await addToCartApi(product?._id, obj);
        if (res && res?.success) {
          setaddToggle(true);
          getUserCart();
        }
      }
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };
  const [plansArr, setPlansArr] = useState([{name: 'Daily'}, {name: 'Alternate Days'}, {name: 'One Time'}, {name: 'Custom'}]);
  const [selectedtype, setSelectedtype] = useState('');

  const [categoryArr, setCategoryArr] = useState([
    {
      imageSource: require('../../assets/img/laysto1.png'),
      name: 'Lay’s Classic',
      wet: '52 g',
      price: '45',
      btnadd: 'ADD',
    },
    {
      imageSource: require('../../assets/img/cheetos1.png'),
      name: 'Cheetos Flamin Hot',
      wet: '52 g',
      price: '45',
      btnadd: 'ADD',
    },
    {
      imageSource: require('../../assets/img/Pepsi1.png'),
      name: 'Pepsi',
      wet: '250 ml',
      price: '45',
      btnadd: 'ADD',
    },
    {
      imageSource: require('../../assets/img/bananan1.png'),
      name: 'Juice Becker Bester',
      wet: '250 ml',
      price: '45',
      btnadd: 'ADD',
    },
    {
      imageSource: require('../../assets/img/fastfd1.png'),
      name: 'Lay’s Classic',
      wet: '52 g',
      price: '45',
      btnadd: 'ADD',
    },
    {
      imageSource: require('../../assets/img/frouts11.png'),
      name: 'Cheetos Flamin Hot',
      wet: '52 g',
      price: '45',
      btnadd: 'ADD',
    },
    {
      imageSource: require('../../assets/img/Juice.png'),
      name: 'Juice Becker Bester',
      wet: '250 ml',
      price: '45',
      btnadd: 'ADD',
    },
  ]);

  const [dateModal, setDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleQuantityAdd = async () => {
    try {
      if (product) {
        let {data: res} = await addQuantityinToCartApi(productStockId);
        if (res && res?.success) {
          setaddToggle(true);
          getUserCart();
        } else {
          toastError(res.message);
        }
      }
    } catch (error) {
      console.log(error);
      toastError(error);
    }
    setQuantity(prev => `${parseInt(prev) + 1}`);
  };
  const handleQuantityMinus = async () => {
    try {
   
      if (product) {
        let {data: res} = await removeQuantityinToCartApi(productStockId);
        if (res && res?.success) {
          setaddToggle(true);
          getUserCart();
        } else {
          toastError(res.message);
        }
      }
    } catch (error) {
      console.log(error);
      toastError(error);
    }
    setQuantity(prev => `${parseInt(prev) - 1}`);
    // let finalValue = quantity - 1;
    // if (finalValue < 2) {
    //   setaddToggle(false);
    // } else {
    //   setQuantity(finalValue);
    // }
  };

  const subcriprtiondate = ({item, index}) => {
    return (
      <View style={styles1.datesubcirption}>
        <Image source={item?.imageSource} style={styles1.responsivproduct} resizeMode="contain" />

        <Text style={[ExternalStyles.reletiproname, {fontSize: 9}]}>{item?.name}</Text>
        <Text style={ExternalStyles.reletiprodgram}>{item?.wet}</Text>
        <Text style={[ExternalStyles.reletiprodgram, styles1.blackcolr]}>{item?.price}</Text>

        <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}} colors={['#F03893', '#F7A149']} style={[ExternalStyles.addproduc, ExternalStyles.mttop5]}>
          <Text style={[ExternalStyles.addproductbtn]}>{item?.btnadd}</Text>
        </LinearGradient>
      </View>
    );
  };

  const produtBannerSliders = ({item, index}) => {
    return (
      <View style={[ExternalStyles.slide2, ExternalStyles.textcenter]}>
        <Image source={require('../../assets/img/product1.png')} />
      </View>
    );
  };
  useEffect(() => {
    if (selectedDate != '' && selectedtype != '') {
      setdisableAddBtn(false);
    }
  }, [selectedDate, selectedtype]);

  const onDateChangeFn = date => {
    console.log(date);
    setSelectedDate(date);
    setDateModal(false);
  };
  const handleSubscriptionQuantityChange = value => {
    if (value == 'plus') {
      setSubscriptionQuantity(prevState => prevState + 1);
    } else {
      if(subscriptionQuantity <=1){
        return 0;
      }
      setSubscriptionQuantity(prevState => prevState - 1);
    }
  };

  const handleSubscribeNavigate = () => {

    if(selectedDate == ""){
      toastError("Please Select Subscription Date")
      return 0
    }

    if(selectedtype == ""){
      toastError("Please Select Subscription Type")
      return 0
    }

    let productArr = [
      {
        productId: product?.productId,
        variantId: product?.variantId,
        buyingPrice: product?.buyingPrice,
        sellingPrice: product?.sellingPrice,
        name: product?.name,
        image: product.product.productObj.mainImage,
        quantity: subscriptionQuantity,
      },
    ];

    navigation.navigate('SubscriptionCheckout', {productArr: productArr, subscriptionType: selectedtype, startDate: selectedDate});
  };

  return (
    <>
      <Header stackHeader={true} screenName={'Product'} rootProps={props} />

      <ScrollView style={styles1.bgcolorwhite}>



        <View style={ExternalStyles.pdlr}>

 
          {product.product && product.product.productObj && product.product.productObj.imageArr && product.product.productObj.imageArr.length > 0 && (
            <Swiper
              style={[ExternalStyles.wrapper, ExternalStyles.mttop20]}
              showsDoots={true}
              loop={true}
              autoplay={true}
              autoplayTimeout={3}
              activeDot={
                <View
                  style={{
                    backgroundColor: '#F3664B',
                    width: 14,
                    height: 7,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                />
              }
              dot={
                <View
                  style={{
                    backgroundColor: '#BFC9DA',
                    width: 14,
                    height: 7,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                />
              }>
              {product.product &&
                product.product.productObj &&
                product.product.productObj.imageArr &&
                product.product.productObj.imageArr.length > 0 &&
                [{image:product.product.productObj.mainImage},...product.product.productObj.imageArr].map((image, index) => (
                  <View key={index} style={[ExternalStyles.slide2, ExternalStyles.textcenter]}>
                    <Image style={{width: 100, height: 100}} source={{uri: generateFilePath(image?.image)}} />
                  </View>
                ))}
            </Swiper>
          )}
          <View style={ExternalStyles.mttop10}>
            <View style={ExternalStyles.prodcoff}>
              <View>
                <Text
                  style={{
                    color: '#FA662E',
                    fontWeight: '600',
                    fontSize: 15,
                    marginBottom: 5,
                  }}>
                  {category?.name}
                </Text>
                <Text
                  style={{
                    color: '#303733',
                    fontWeight: '600',
                    fontSize: 15,
                    marginBottom: 5,
                  }}>
                  {product?.product?.name}
                </Text>
                <Text style={{color: '#303733', fontWeight: '400', fontSize: 12}}>{product?.attribute?.name}</Text>
              </View>
              <View>
                <Text style={ExternalStyles.offbtn}>10% OFF</Text>
              </View>
            </View>
            <View style={[ExternalStyles.adprice, ExternalStyles.rowflex1, ExternalStyles.mttop10]}>
              <View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 22,
                      color: '#000',
                      marginRight: 10,
                      fontWeight: '700',
                    }}>
                    <FontAwesome name={'inr'} size={20} color={'#000'} /> {product?.product?.price}
                  </Text>
                  {/* <Text
                    style={{
                      color: '#959494',
                      textDecorationLine: 'line-through',
                      fontWeight: '600',
                      fontSize: 13,
                      marginTop: 8,
                    }}>
                    <FontAwesome name={'inr'} size={16} color={'#959494'} /> 60
                  </Text> */}
                </View>
              </View>
              <View>
                {addtoggle == false ? (
                  <TouchableOpacity onPress={() => handleSwitchInCartAndSubscription()}>
                    <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}} colors={disableAddBtn ? ['#959494', '#959494'] : ['#F03893', '#F7A149']} style={ExternalStyles.addbtn}>
                      <Text style={[ExternalStyles.btntext, {paddingHorizontal: 22}]}>Add</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <>
                    {subscriptionActive ? (
                      <LinearGradient
                        start={{x: 0.0, y: 0.0}}
                        end={{x: 1.0, y: 0.0}}
                        colors={['#F03893', '#F7A149']}
                        style={[
                          ExternalStyles.boxplusmines,
                          {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          },
                        ]}>
                        <Pressable style={{padding: 10}} onPress={() => handleSubscriptionQuantityChange('minus')}>
                          <Icon size={18} name="minus" color="#fff" />
                        </Pressable>
                        <Text style={{color: '#fff', padding: 10}}>{subscriptionQuantity}</Text>
                        <Pressable style={{padding: 10}} onPress={() => handleSubscriptionQuantityChange('plus')}>
                          <Icon size={18} name="plus" color="#fff" />
                        </Pressable>
                      </LinearGradient>
                    ) : (
                      <LinearGradient
                        start={{x: 0.0, y: 0.0}}
                        end={{x: 1.0, y: 0.0}}
                        colors={['#F03893', '#F7A149']}
                        style={[
                          ExternalStyles.boxplusmines,
                          {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          },
                        ]}>
                        <Pressable style={{padding: 10}} onPress={() => handleQuantityMinus()}>
                          <Icon size={18} name="minus" color="#fff" />
                        </Pressable>
                        <Text style={{color: '#fff', padding: 10}}>{quantity}</Text>
                        <Pressable style={{padding: 10}} onPress={() => handleQuantityAdd()}>
                          <Icon size={18} name="plus" color="#fff" />
                        </Pressable>
                      </LinearGradient>
                    )}
                  </>
                )}
              </View>
            </View>
            <View>
              {subscriptionActive && (
                <View>
                  <View style={[styles.flexRowBetween, {marginTop: 20}]}>
                    <Pressable onPress={() => setPlanSelectEnabled(!planSelectEnabled)}>
                      <Text style={styles1.smalltext}>Select your plan type</Text>
                      <View style={[styles.flexRow, {marginTop: 10}]}>
                        <Text style={{marginRight: 10, color: 'black', fontSize: 14}}>{selectedtype == '' ? 'Type' : selectedtype}</Text>
                        <Feather name="edit" color="#EB8E24" size={17} />
                      </View>
                    </Pressable>

                    <Pressable onPress={() => setDateModal(true)}>
                      <Text style={styles1.smalltext}>Start Date</Text>
                      <View style={[styles.flexRow, {marginTop: 10}]}>
                        <Text style={{marginRight: 14, color: 'black', fontSize: 14}}>{selectedDate == '' ? 'Choose Date' : new Date(selectedDate).toDateString()}</Text>
                        <Feather name="edit" color="#EB8E24" size={17} />
                      </View>
                    </Pressable>
                  </View>
                  {planSelectEnabled && (
                    <View style={[styles.flexRow, {marginTop: 15}]}>
                      {plansArr.map((el, index) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setSelectedtype(el.name);
                              setPlanSelectEnabled(false);
                            }}
                            style={{flex: index != 1 ? 1 : 1.5, borderRadius: 7, marginHorizontal: 7, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}
                            key={index}>
                            <Text style={{padding: 5, fontSize: 11, color: '#000', fontWeight: '600'}}>{el.name}</Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#989898',
              borderBottomWidth: 0.5,
              marginTop: 15,
            }}></View>

          <View style={ExternalStyles.decriptbox}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
            <Pressable   onPress={() => {
                  setToggle(!toggle);
                }}><Text
                style={ExternalStyles.decriptheading}
               >
                About Product
              </Text></Pressable>
              <Pressable   onPress={() => {
                  setToggle(!toggle);
                }}><Entypo name={!toggle ? 'chevron-down' : 'chevron-up'} size={20} color={'#000'} style={{textAlign: 'right'}} /></Pressable>
             
            </View>
            <Text style={[ExternalStyles.prductdecrp, ExternalStyles.mttop5]}></Text>
            {toggle && <Text style={ExternalStyles.prductdecrp}>
            <WebView
        originWhitelist={['*']}
        source={{ html: `${product.product?.productObj.description}` }}
      />
              </Text>}
          </View>
        </View>

        <View style={ExternalStyles.reletivprod}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#000',
              marginBottom: 15,
            }}>
            You Might Also Like
          </Text>
          <FlatList style={ExternalStyles.mttop10} contentContainerStyle={{}} data={categoryArr} horizontal renderItem={subcriprtiondate} keyExtractor={(item, index) => `${index}`} />
        </View>
      </ScrollView>
      {addtoggle && (
        <>
          {subscriptionActive ? (
            <View style={ExternalStyles.pdlr}>
              <View style={ExternalStyles.viewcartbotm}>
                <View style={[ExternalStyles.rowflex1, ExternalStyles.botomvewcart]}>
                  <View>
                    <Text style={ExternalStyles.itemselectxt}>{subscriptionQuantity}</Text>
                    <Text style={ExternalStyles.viewcartprc}>
                      <FontAwesome name={'inr'} size={19} color={'#fff'} /> {product?.product?.price * subscriptionQuantity}
                    </Text>
                  </View>
                  <Pressable onPress={() => handleSubscribeNavigate()}>
                    <Text style={ExternalStyles.cartarrow}>
                      Subscribe <Entypo name={'chevron-right'} size={20} color={'#fff'} />
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ) : (
            <View style={ExternalStyles.pdlr}>
              <View style={ExternalStyles.viewcartbotm}>
                <View style={[ExternalStyles.rowflex1, ExternalStyles.botomvewcart]}>
                  <View>
                    <Text style={ExternalStyles.itemselectxt}>{cartArr?.length}</Text>
                    <Text style={ExternalStyles.viewcartprc}>
                      <FontAwesome name={'inr'} size={19} color={'#fff'} /> {total}
                    </Text>
                  </View>
                  <Pressable onPress={() => navigation.navigate('Cart')}>
                    <Text style={ExternalStyles.cartarrow}>
                      View Cart <Entypo name={'chevron-right'} size={20} color={'#fff'} />
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={dateModal}
        onRequestClose={() => {
          setDateModal(!dateModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{padding: 10}}>
              <CalendarPicker minDate={new Date()} width={wp(85)} onDateChange={onDateChangeFn} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: wp(90),

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
const styles1 = StyleSheet.create({
  datesubcirption: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: wp(32),
    marginRight: 6,
  },
  proheight: {
    minHeight: 70,
    textAlign: 'center',
    alignSelf: 'center',
  },
  responsivproduct: {
    width: wp(25),
    height: hp(8),

    textAlign: 'center',
    alignSelf: 'center',
  },
  bgcolorwhite: {
    backgroundColor: '#ffff',
  },
  blackcolr: {
    color: '#000',
  },
  smalltext: {
    fontSize: 10,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
});
