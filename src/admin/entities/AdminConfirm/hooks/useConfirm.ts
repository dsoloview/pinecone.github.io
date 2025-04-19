interface IConfirmParams {
  title: string;
  message: string;
  label: string;
  action: () => void;
}

const isOpen = ref<boolean>(false);

const params = ref<IConfirmParams>({
  title: "",
  message: "",
  label: "",
  action: () => {},
});

export const useConfirm = () => {
  function confirm(newParams: IConfirmParams) {
    params.value = newParams;
    isOpen.value = true;
  }

  return { confirm, isOpen, params };
};
