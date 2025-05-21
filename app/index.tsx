import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default function Index() {
  return (
    <LinearGradient
      colors={['bg-accent', 'bg-accent']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className="flex-1 items-center  px-6"
    >
      <Animatable.View
        animation="bounceIn"
        duration={1500}
        className="items-center"
      >
        <Image
          source={require("../assets/images/logo.png")}
          className="w-[100vw]  "
          resizeMode="contain"
        />

      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        delay={500}
        className="w-full items-center"
      >
        <Link href="/scan" asChild>
          <TouchableOpacity className="w-full max-w-xs">
            <View className="bg-primary px-8 py-4 rounded-full items-center shadow-lg">
              <Text className="text-white text-xl font-bold">Scan Product</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          onPress={() => { /* implement share logic */ }}
          className="flex-row flex justify-center mt-6 border border-white py-4 text-center w-full max-w-xs rounded-full items-center shadow-lg"
        >
          <Ionicons name="share-social" size={24} color="#FFFFFF" />
          <Text className="text-secondary ml-2 text-lg">Share this app</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View
        animation="fadeIn"
        delay={1000}
        className="absolute bottom-8"
      >
        <Text className="text-secondary opacity-70">v1.0.0</Text>
      </Animatable.View>
    </LinearGradient>
  );
}