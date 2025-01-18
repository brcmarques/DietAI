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
import { useDataStore } from '../../store/data'
import { router } from 'expo-router'

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

      const setPageTwo = useDataStore(state => state.setPageTwo)

      const genderOptions = [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" },

      ]

      const levelOptions = [
        { label: "Sedentario, (pouco ou nenhuma atividade física)", value: "Sedentário" },
        { label: "Levemente ativo, (exercícios de 1 a 3 vezes na semana)", value: "Levemente ativo, (exercícios de 1 a 3 vezes na semana)" },
        { label: "Moderadamente ativo, (exercícios de 3 a 5 vezes na semana)", value: "Moderadamente ativo, (exercícios de 3 a 5 vezes na semana)" },
        { label: "Altamente ativo, (exercícios de 5 a 7 vezes na semana)", value: "Altamente ativo, (exercícios de 5 a 7 vezes na semana)" },

      ]

      const objectiveOptions = [
        { label: "Emagrecer", value: "Emagrecer" },
        { label: "Hipertrofia", value: "Hipertrofia" },
        { label: "Definição", value: "Definição" },
        { label: "Hipertrofia + Definição", value: "Hipertrofia + Definição" },

      ]

      function handleCreate(data: FormData) {
        setPageTwo ({
          level: data.level,
          gender: data.gender,
          objective: data.objective
        })
        
        router.push("/nutrition")
      }

      

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
                placeholder='Qual seu sexo biológico?'
                error={errors.gender?.message}
                options={genderOptions}
            />

            <Text style={styles.label}>Selecione o seu nivel de atividade física:</Text>
            <Select
                control={control}
                name='level'
                placeholder='Dentro das opções quão ativo você é?'
                error={errors.level?.message}
                options={levelOptions}
            />

            <Text style={styles.label}>Selecione o seu objetivo de dieta:</Text>
            <Select
                control={control}
                name='objective'
                placeholder='Qual seu objetivo?'
                error={errors.objective?.message}
                options={objectiveOptions}
            />

            <Pressable
              onPress={handleSubmit(handleCreate)}
              style={styles.button}>
            
              <Text style={styles.buttonText}>
                Avançar
              </Text>
            
            </Pressable>
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
    },
    button:{
      backgroundColor: colors.blue,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4
    },
    buttonText:{
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold'
    }
})