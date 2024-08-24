import { Home } from "@screens/Home";
import { CreatePost } from "@screens/CreatePost";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";


export type PrivateRoutes = {
  home: undefined;
  createPost: undefined;
};

export type PrivateNavigatorRoutesProps = NativeStackNavigationProp<PrivateRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<PrivateRoutes>();

export function PrivateRoutes() {
  return (
    <Navigator
      screenOptions={{  headerShown: false }}
    >
      <Screen
        name="home"
        component={Home}
      />        
      <Screen
          name="createPost"
          component={CreatePost}
      /> 
    </Navigator>
  );
}
