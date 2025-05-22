import API from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';



export default function Scan() {
    const [scanned, setScanned] = useState(false);
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const [isCameraReady, setIsCameraReady] = useState(false);

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission();
        }
    }, [permission]);

    const handleBarCodeScanned = async ({ data }: { data: string }) => {
        if (!scanned) {
            setScanned(true);

            try {
                const parsed = JSON.parse(data);
                const { serial, signature, timestamp } = parsed;

                console.log("Scanned data:", parsed);

                const response = await API.post('/verify', {
                    serial,
                    signature,
                    timestamp,
                });

                const result = response.data;
                console.log('Verification result:', result);

                router.push({
                    pathname: '/result',
                    params: { result: JSON.stringify(result) },
                });

            } catch (error: any) {
                console.log('Error in verification:', error);

                const errorData = error?.response?.data || {
                    valid: false,
                    message: 'Verification failed. Please try again.',
                };

                router.push({
                    pathname: '/result',
                    params: { result: JSON.stringify(errorData) },
                });
            }
        }
    };




    if (!permission) {
        return (
            <View className="flex-1 bg-black items-center justify-center">
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View className="flex-1 bg-black items-center justify-center p-4">
                <Text className="text-white text-lg mb-6 text-center">
                    We need your permission to use the camera
                </Text>
                <TouchableOpacity
                    onPress={requestPermission}
                    className="bg-blue-500 px-5 py-2 rounded-md"
                >
                    <Text className="text-white text-base">Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-black">
            <View className="pt-12 pb-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="#3b82f6" />
                </TouchableOpacity>
            </View>

            {/* Camera View with explicit dimensions */}
            <View className="flex-1">
                {Platform.OS === "android" ? <StatusBar hidden /> : null}
                <CameraView
                    style={{ flex: 1 }}
                    facing="back"
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "pdf417"],
                    }}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    onCameraReady={() => {
                        console.log("Camera is ready!");
                        setIsCameraReady(true);
                    }}
                >
                    {!isCameraReady && (
                        <View className="absolute inset-0 bg-black/50 items-center justify-center">
                            <ActivityIndicator size="large" color="#ffffff" />
                            <Text className="text-white mt-4">Initializing camera...</Text>
                        </View>
                    )}
                </CameraView>
            </View>

            {/* Scan frame overlay */}
            <View className="absolute inset-0 items-center justify-center pointer-events-none ">
                <View className="w-64 h-64  border-2 border-dashlines border-primary rounded bg-transparent" />
                <Text className="text-white mt-5 text-base">
                    Align QR code within frame
                </Text>
            </View>

            {scanned && (
                <TouchableOpacity
                    onPress={() => setScanned(false)}
                    className="absolute bottom-10 self-center bg-primary mb-10 px-5 py-3 rounded-md"
                >
                    <Text className="text-white text-base">Scan Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}