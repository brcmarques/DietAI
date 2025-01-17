import { 
    View, 
    Text, 
    Pressable, 
    StyleSheet, 
    ScrollView 
} from 'react-native'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { colors } from '../../constants/colors'
import { Header } from '@/components/header'
import { Select } from '../../components/input/select'

const schema = z.object({
    gender: z.string().min(1, { message: "O genero é obrigatório" }),
    level: z.string().min(1, { message: "O level é obrigatório" }),
    objective: z.string().min(1, { message: "O objetivo é obrigatório" }),
  })
  
  type FormData = z.infer<typeof schema>

export default function Create() {

    const { control, handleSubmit, formState: { errors, isValid } } = 
      useForm<FormData>({
        resolver: zodResolver(schema)
    
      })

      const genderOptions = [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" },

      ]

 return (
   <View style={styles.container}>
        <Header
            step='Passo 2'
            title='Finalizando dieta'
        />
        
        <ScrollView style={styles.content}>
            <Text style={styles.label}>Sexo:</Text>
            <Select
                control={control}
                name='gender'
                placeholder='Selecione o seu sexo'
                error={errors.gender?.message}
                options={genderOptions}
            />
        </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background
    },
    label:{
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8
    },
    content:{
        paddingLeft: 16,
        paddingRight: 16,
    }
})