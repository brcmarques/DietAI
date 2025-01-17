import { View, StyleSheet, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { Controller } from 'react-hook-form'
import { colors } from '@/constants/colors';

interface InputProps{
    name: string;
    control: any;
    placeholder?: string;
    rules?: object;
    error?: string;
    keyboardType: KeyboardTypeOptions;
}

export function Input({ control, keyboardType, name, error, placeholder, rules }: InputProps) {
 return (
    <View style={styles.container}>
        <Controller 
            control={control}
            name={name}
            rules={rules}

            render={({ field: { onChange, onBlur, value }}) => (
                <TextInput
                    style={styles.input}

                    placeholder={placeholder}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    keyboardType={keyboardType}
                />
            )}

        />

        {error && <Text style={styles.errorText}>{error}</Text>}
    </View>

 );
}
const styles = StyleSheet.create({
    container:{
        marginBottom: 16
    },
    input:{
        backgroundColor: colors.white,
        height: 44,
        paddingHorizontal: 10,
        borderRadius: 4
    },
    errorText:{
        color: 'red',
        marginTop: 4
    }
})