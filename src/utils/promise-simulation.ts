import { toast } from "sonner";

export const handleSimulationPromise = ({
  loading,
  success,
  error,
}: {
  loading: string;
  success: string;
  error: string;
}) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5; // Simulasi sukses/gagal
      if (isSuccess) {
        resolve("Download berhasil!");
      } else {
        reject("Download gagal!");
      }
    }, 2000);
  });

  toast.promise(promise, {
    loading: loading,
    success: success,
    error: error,
  });
};
