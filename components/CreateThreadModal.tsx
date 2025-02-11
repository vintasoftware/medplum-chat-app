import { useRouter } from "expo-router";
import { useState } from "react";

import { LoadingButtonSpinner } from "@/components/LoadingButtonSpinner";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/Modal";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";

interface CreateThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateThread: (topic: string) => Promise<string | undefined>;
}

export function CreateThreadModal({ isOpen, onClose, onCreateThread }: CreateThreadModalProps) {
  const [topic, setTopic] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      const threadId = await onCreateThread(topic);
      if (threadId) {
        setTopic("");
        onClose();
        router.push(`/thread/${threadId}`);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const isValid = Boolean(topic.trim());

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Create New Thread</ModalHeader>
      <ModalBody>
        <Input size="md" isDisabled={isCreating}>
          <InputField
            value={topic}
            onChangeText={setTopic}
            placeholder="Enter conversation topic..."
            className="min-h-[44px] py-3"
          />
        </Input>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onPress={onClose} className="mr-2">
          <ButtonText>Cancel</ButtonText>
        </Button>
        <Button className="min-w-[100px]" disabled={!isValid || isCreating} onPress={handleCreate}>
          {isCreating ? <LoadingButtonSpinner /> : <ButtonText>Create</ButtonText>}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
