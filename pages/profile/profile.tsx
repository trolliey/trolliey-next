import React from 'react'

import {
  Box,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Skeleton,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react'
import {
  FaAward,
  FaCalendarDay,
  FaFacebook,
  FaInfoCircle,
  FaInstagram,
  FaMapMarkerAlt,
  FaTwitter,
  FaUserAlt,
  FaUserCog,
} from 'react-icons/fa'

interface ProfileDetailsProps {
  userDetails?: {
    firstname?: string
    lastname?: string
    name?: string
    email?: string
    about?: string
    createdAt?: string
    dateOfBirth?: string
    city?: string

    socials?: {
      id?: string
      provider?: string
      username?: string
    }[]
  }
  showSkeleton: boolean
  source?: string
  role?: string
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  userDetails,
  showSkeleton,
  role,
}) => {
  console.log(userDetails)
  return (
    <Box as={GridItem} w={'full'} my={8}>
      <Box p={8} bg="white" border={'1px #E2E8F0 solid'}>
        {showSkeleton ? <Skeleton height={20} /> : null}
        {userDetails && !showSkeleton && (
          <Flex color={'brand.sienna'} justifyContent={'space-between'} gap={5}>
            <Box>
              <Heading color={'brand.jacarta'} fontSize={24} fontWeight={500}>
                {userDetails?.firstname
                  ? `${userDetails?.firstname} ${userDetails?.lastname}`
                  : userDetails?.name}
              </Heading>
              <Text color={'brand.jacarta'} fontWeight={400} fontSize={'md'}>
                {userDetails?.email}
              </Text>
            </Box>
          </Flex>
        )}

        <Divider my={8} />

        <Box my={5}>{showSkeleton ? <Skeleton height={20} /> : null}</Box>

        <Box my={5}>{showSkeleton ? <Skeleton height={20} /> : null}</Box>

        {userDetails && !showSkeleton && (
          <Box>
            <Flex align={'center'} mb={5} gap={7}>
              <FaInfoCircle size={18} />
              <Text>
                {userDetails?.about ? userDetails?.about : 'No bio yet'}
              </Text>
            </Flex>

            <Flex align={'center'} mb={5} gap={7}>
              <FaAward size={18} />
              <Text fontWeight={500} fontSize={'md'}>
                {' '}
                {role === 'user' ? 'Customer' : 'Seller'}
              </Text>
            </Flex>

            <Flex align={'center'} mb={5} gap={7}>
              <FaCalendarDay size={18} />
              <Text fontWeight={500} fontSize={'md'}>
                Member since {/* @ts-ignore */}
                {new Date(userDetails?.createdAt).toLocaleDateString()}
              </Text>
            </Flex>

            <Flex align={'center'} mb={5} gap={7}>
              <FaMapMarkerAlt size={18} />
              <Text fontWeight={500} fontSize={'md'}>
                {userDetails?.city ? userDetails?.city : 'No location yet'}
              </Text>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ProfileDetails
