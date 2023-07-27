import { z as zod } from 'zod'
import { useRouter } from 'next/router'
import { api } from '../../../lib/axios'
import { useForm } from 'react-hook-form'
import { GetServerSideProps } from 'next'
import { ArrowRight } from 'phosphor-react'
import { getServerSession } from 'next-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormAnnotation, ProfileBox } from './styles'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import {
  Text,
  Avatar,
  Button,
  Heading,
  TextArea,
  MultiStep,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { useSession } from 'next-auth/react'

const updateProfileSchema = zod.object({
  bio: zod.string(),
})

type UpdateProfileData = zod.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const session = useSession()
  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })
    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            referrerPolicy="no-referrer"
            alt={session.data?.user.name}
          />
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
