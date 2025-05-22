import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const Result = () => {
    const params = useLocalSearchParams();
    const resultParam = Array.isArray(params.result) ? params.result[0] : params.result;
    const data = resultParam ? JSON.parse(resultParam) : {};

    return (
        <View className="flex-1 bg-accent px-6">
            {/* Header with back button */}
            <View className="pt-12 pb-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="#3b82f6" />
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View className="flex-1 justify-center items-center">
                {data.valid ? (
                    <View className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
                        <View className="items-center mb-6">
                            <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
                                <Ionicons name="checkmark-circle" size={48} color="#16a34a" />
                            </View>
                            <Text className="text-green-600 text-2xl font-bold">Authentic Product</Text>
                        </View>

                        <View className="space-y-4">
                            <View className="flex-row justify-between border-b border-gray-100 pb-3">
                                <Text className="text-gray-500">Product Name</Text>
                                <Text className="font-semibold">{data.productName}</Text>
                            </View>
                            <View className="flex-row justify-between border-b border-gray-100 pb-3">
                                <Text className="text-gray-500">Serial Number</Text>
                                <Text className="font-semibold">{data.serialNumber}</Text>
                            </View>
                            <View className="flex-row justify-between border-b border-gray-100 pb-3">
                                <Text className="text-gray-500">Manufacturer</Text>
                                <Text className="font-semibold">{data.manufacturerCompany}</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-gray-500">Contact Email</Text>
                                <Text className="font-semibold">{data.manufacturerEmail}</Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View className="w-full max-w-md bg-white rounded-2xl p-8 items-center shadow-lg">
                        <View className="w-24 h-24 bg-red-100 rounded-full items-center justify-center mb-6">
                            <Ionicons name="close-circle" size={48} color="#dc2626" />
                        </View>
                        <Text className="text-red-600 text-2xl font-bold mb-2">Warning!</Text>
                        <Text className="text-center text-gray-700 text-lg">{data.message}</Text>

                        <TouchableOpacity
                            className="mt-8 bg-primary py-3 px-6 rounded-full w-full items-center"
                            onPress={() => router.push('/scan')}
                        >
                            <Text className="text-white font-bold">Scan Again</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Result;