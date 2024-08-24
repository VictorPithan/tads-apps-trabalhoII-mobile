import { ActivityIndicator } from 'react-native';

export function LoadingList({loading}: { loading: boolean}) {
    if (loading) {
        return <ActivityIndicator size={'large'} />
    }
    return null
}