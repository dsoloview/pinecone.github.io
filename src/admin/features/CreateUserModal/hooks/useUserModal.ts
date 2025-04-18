import { defineStore } from "pinia";
import type { PublicUser } from "~/shared/types/user";

interface UserModalState {
  isOpen: boolean;
  user: Partial<PublicUser> | null;
  isEditing: boolean;
  serverErrors: Record<string, string>;
}

export const useUserModal = defineStore("userModal", {
  state: (): UserModalState => ({
    isOpen: false,
    user: null,
    isEditing: false,
    serverErrors: {},
  }),

  actions: {
    openCreate() {
      this.isOpen = true;
      this.user = null;
      this.isEditing = false;
      this.serverErrors = {};
    },

    openUpdate(user: PublicUser) {
      this.isOpen = true;
      this.user = { ...user };
      this.isEditing = true;
      this.serverErrors = {};
    },

    close() {
      this.isOpen = false;
      this.serverErrors = {};
    },

    setServerErrors(errors: Record<string, string>) {
      this.serverErrors = errors;
    },

    clearServerError(field: string) {
      if (this.serverErrors[field]) {
        const errors = { ...this.serverErrors };
        delete errors[field];
        this.serverErrors = errors;
      }
    },

    toggle() {
      this.isOpen = !this.isOpen;
    },
  },

  getters: {
    modalTitle: (state) =>
      state.isEditing ? "Обновить пользователя" : "Создать пользователя",
  },
});
