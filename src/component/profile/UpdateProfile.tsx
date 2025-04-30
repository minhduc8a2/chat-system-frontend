import { FormEvent, useState } from "react"
import {
  Form,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalBody,
} from "@heroui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  UserProfile,
  UserProfileEditable,
} from "../../model/domain/UserProfile"
import { UserAPI } from "../../api/UserAPI"

import { useSimpleModal } from "../SimpleModal/SimpleModalContext"
import { QueryUserKey } from "../../model/enum/QueryUserKey"
import { FaEdit } from "react-icons/fa"
import { useAuth } from "../../hook/useAuth"
export default function UpdateProfile({ userData }: { userData: UserProfile }) {
  const [isOpen, setIsOpen] = useState(false)
  const { authInfo } = useAuth()
  const [formData, setFormData] = useState<UserProfileEditable>(() => {
    return userData.editableObject() // converts class instance to plain object
  })
  const { showSimpleModal } = useSimpleModal()

  const client = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => UserAPI.updateProfile(authInfo!.userId, formData),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [QueryUserKey.PROFILE + authInfo?.userId],
      })
      showSimpleModal("User profile has been updated!")
      setIsOpen(false)
    },
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <>
      <Button isIconOnly onPress={() => setIsOpen(true)}>
        <FaEdit className="text-lg" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(false)}>
        <ModalContent>
          <ModalBody>
            <Form className="w-full max-w-sm p-4" onSubmit={handleSubmit}>
              <h1 className="text-xl mb-8">Update Profile</h1>

              {/* Dynamically render inputs */}
              {Object.entries(formData).map(([key, value]) => (
                <Input
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  name={key}
                  value={value}
                  onValueChange={(val) => handleChange(key, val)}
                  placeholder={`Enter your ${key}`}
                  isRequired
                  className="mb-4"
                  labelPlacement="outside"
                />
              ))}

              <Button
                type="submit"
                variant="bordered"
                className="mt-4"
                isLoading={mutation.isPending}
                isDisabled={mutation.isPending}
              >
                Save Changes
              </Button>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
