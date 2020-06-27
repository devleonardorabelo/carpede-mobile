import { StyleSheet, PixelRatio, Dimensions } from 'react-native';

const widthDP = widthPercent => {
    const screenWidth = Dimensions.get('window').width;
    return PixelRatio.roundToNearestPixel(screenWidth * parseFloat(widthPercent) / 100);
};
const heightDP = heightPercent => {
    const screenHeight = Dimensions.get('window').height;
    return PixelRatio.roundToNearestPixel(screenHeight * parseFloat(heightPercent) / 100);
};


export default StyleSheet.create({
    
    //STRUCTURE
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
    },
    header: {
        marginBottom: widthDP('4%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: widthDP('4%'),
        paddingTop: widthDP('4%'),
    },
    store: {
        flexDirection: 'row',
        paddingVertical: widthDP('4%'),
        paddingHorizontal: widthDP('4%'),
    },
    storeAvatar: {
        backgroundColor: '#E2E2E2',
        width: widthDP('16%'),
        height: widthDP('16%'),
        borderRadius: 100,
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: widthDP('4%'),
    },
    column: {
        flexDirection: 'column',
        paddingHorizontal: widthDP('4%'),
    },
    scrollHorizontal: {
        paddingLeft: widthDP('4%'),
    },
    alignCenterX: {
        justifyContent: 'center'
    },
    absoluteBottomRight: {
        position: 'absolute',
        right: widthDP('4%'),
        bottom: widthDP('4%'),
    },
    absoluteBottomLeft: {
        position: 'absolute',
        left: widthDP('4%'),
        bottom: widthDP('4%'),
    },
    //NAVITEM
    action: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DFDFDF',
        paddingVertical: widthDP('4%')
    },
    iconAction: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: widthDP('4%'),
        borderTopLeftRadius: widthDP('2%'),
        borderBottomLeftRadius: widthDP('2%'),
    },
    arrowAction: {
        alignItems: 'center',
        justifyContent: 'center',
        width: widthDP('12%'),
        borderTopRightRadius: widthDP('2%'),
        borderBottomRightRadius: widthDP('2%'),
    },
    subtitleTextAction: {
        fontFamily: 'Montserrat Light',
        fontSize: widthDP('4%'),
        marginTop: -2,
        color: '#666666'
    },
    //BOX
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: widthDP('2%'),
        padding: widthDP('2%'),
        marginBottom: widthDP('2%'),
        backgroundColor: '#F9F9F9',
    },
    boxImage: {
        width: widthDP('24%'),
        height: '100%',
        borderRadius: widthDP('2%')
    },
    boxBody: {
        flexDirection: 'column',
        padding: widthDP('4%'),
        flexGrow: 1,
    },
    alertBottom: {
        backgroundColor: '#639DFF',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: widthDP('4%'),
        paddingVertical: widthDP('2%'),
        zIndex: 999,
    },
    //IMAGE
    fullImage: {
        width: widthDP('100%'),
        height: widthDP('84%'),
    },
    uploadImage: {
        width: widthDP('100%'),
    },
    groupFloatButton: {
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: 24
    },
    boxFloatButton: {
        position: 'absolute',
        justifyContent: 'center',
        width: widthDP('16%'),
        height: widthDP('16%'),
        alignItems: 'center'
    },
    //TEXTS AND TITLES
    title: {
        fontFamily: 'Montserrat Bold',
        fontSize: widthDP('8%'),
        color: '#333333',
    },
    subtitle: {
        color: '#666666',
        fontSize: widthDP('6%'),
        fontFamily: 'Montserrat Medium'
    },
    text: {
        fontSize: widthDP('4%'),
        fontFamily: 'Montserrat Medium',
        color: '#333333'
    },
    textSemiBold: {
        fontSize: widthDP('4%'),
        fontFamily: 'Montserrat SemiBold',
        color: '#333333'
    },
    textBold: {
        fontSize: widthDP('4%'),
        fontFamily: 'Montserrat Bold',
        color: '#333333'
    },
    textLight: {
        fontSize: widthDP('4%'),
        fontFamily: 'Montserrat Bold',
        color: '#333333'
    },
    textWrap: {
        flex: 1,
        flexWrap: 'wrap',
    },
    textHide: {
        height: widthDP('4%'),
        backgroundColor: '#E2E2E2',
        borderRadius: widthDP('2%'),
    },
    titleHide: {
        height: widthDP('8%'),
        flexGrow: 1,
        marginTop: widthDP('2%'),
        borderRadius: widthDP('2%'),
        backgroundColor: '#E2E2E2',
        borderRadius: widthDP('2%'),
    }, 

    //BUTTONS
    button: {
        height: widthDP('12%'),
        borderRadius: widthDP('2%'),
        marginBottom: widthDP('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: widthDP('4%')
    },
    buttonTransparent: {
        height: widthDP('12%'),
        backgroundColor: 'transparent',
        marginBottom: widthDP('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonTag: {
        height: widthDP('8%'),
        minWidth: 80,
        borderRadius: widthDP('2%'),
        marginBottom: widthDP('4%'),
        marginRight: widthDP('2%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: widthDP('4%'),
        backgroundColor: '#E2E2E2'
    },
    buttonFloat: {
        backgroundColor: '#639DFF',
        width: widthDP('16%'),
        height: widthDP('16%'),
        borderRadius: widthDP('2%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButton: {
        backgroundColor: '#639DFF',
        height: widthDP('16%'),
        width: widthDP('16%'),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    //INPUTS
    groupInput: {
        marginBottom: widthDP('4%'),
    },
    labelInput: {
        flexDirection: 'row'
    },
    labelText: {
        marginLeft: widthDP('2%'),
        marginBottom: widthDP('-2%'),
        zIndex: 999,
        paddingHorizontal: widthDP('1%'),
        backgroundColor: '#FFFFFF',
    },
    iconInput: {
        paddingHorizontal: widthDP('4%'),
        paddingTop: widthDP('4%')
    },
    textInput: {
        height: 50,
        fontSize: widthDP('4%'),   
        fontFamily: 'Montserrat Medium',
        flexGrow: 1,
        borderColor: '#E2E2E2',
        borderRadius: widthDP('2%'),
        borderWidth: 1,
        paddingLeft: widthDP('4%'),
        color: '#333333'
    },
    inputTextAlert: {
        fontFamily: 'Montserrat Light',
        fontSize: widthDP('4%'),
        color: '#E63B2E',
        paddingLeft: widthDP('1%'),
        paddingTop: widthDP('1%'),
    },
    textareaInput: {
        height: heightDP('12%'),
        textAlignVertical: 'top',
        borderColor: '#E2E2E2',
        borderRadius: widthDP('2%'),
        borderWidth: 1,
        padding: widthDP('4%'),
        fontSize: widthDP('4%'),  
        fontFamily: 'Montserrat Medium',
        color: '#333333'   
    },
    //MORE
    illustration: {
        backgroundColor: '#FFFFFF',
        marginBottom: widthDP('15%'),
        maxHeight: heightDP('40%'),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    boxFluid: {
        paddingHorizontal: widthDP('4%'),
        paddingTop: widthDP('4%'),
        width: widthDP('100%'),
    },
    map: {
        flex:1,
    },
    orderList: {
        padding: widthDP('4%'),
        borderRadius: widthDP('2%'),
        marginBottom: widthDP('4%'),
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
    },  
    orderCheckout: {
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        right: 0,
        left: 0,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    orderHeader:{
        width: '100%',
        backgroundColor: '#639DFF',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 128
    },
    orderDropButton: {
        height: 64,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deliveryInfo: {
        flexDirection: 'row',
        backgroundColor: '#639DFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: widthDP('4%'),
    },
    backgroundModal: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: '#FFFFFF',
        padding: widthDP('4%'),
        maxWidth: widthDP('92%')
    },
    headerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    }

})