import { type AccountPayload, type GroupAccountPayload } from "@/model";
import { type TRANSACTION_CATEGORY } from "@prisma/client";
import { nanoid } from "nanoid";

interface GroupAccountPayloadWithAccount extends GroupAccountPayload {
  accounts: Array<
    AccountPayload & {
      category?: TRANSACTION_CATEGORY;
      isPaymentMethod?: boolean;
    }
  >;
}

export const defaultAccountData: GroupAccountPayloadWithAccount[] = [
  {
    accountClass: "ASSET",
    name: "aset lancar",
    code: "1.1",
    accounts: [
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "kas besar",
        posisi: "DEBIT",
        isPaymentMethod: true,
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "kas kecil",
        posisi: "DEBIT",
        isPaymentMethod: true,
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        category: "PERSEDIAAN",
        name: "persediaan barang jadi",
        posisi: "DEBIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "asuransi dibayar dimuka",
        posisi: "DEBIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "sewa dibayar dimuka",
        posisi: "DEBIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "perkiraan sementara",
        posisi: "DEBIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        category: "PIUTANG_USAHA",
        name: "piutang usaha",
        posisi: "DEBIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        category: "PPN_MASUKAN",
        name: "PPN Masukan",
        posisi: "DEBIT",
        reports: ["NERACA"],
      },
    ],
    companyId: "",
  },
  {
    accountClass: "ASSET",
    name: "aset tetap",
    code: "1.2",
    accounts: [
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "alat berat dan kenderaan",
        posisi: "DEBIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "hak merek",
        posisi: "DEBIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "ak.penyusutan kenderaan",
        posisi: "CREDIT",
        reports: ["NERACA"],
      },
    ],
    companyId: "",
  },
  {
    accountClass: "LIABILITY",
    name: "hutang lancar",
    code: "2.1",
    accounts: [
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        category: "HUTANG_USAHA",
        name: "hutang usaha",
        posisi: "CREDIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "PPh 21",
        posisi: "CREDIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "PPh 23",
        posisi: "CREDIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "PPh 29",
        posisi: "CREDIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        category: "PPN_KELUARAN",
        name: "PPN Keluaran",
        posisi: "CREDIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "uang muka pendapatan",
        posisi: "CREDIT",
        reports: ["NERACA"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "hutang pinjaman",
        posisi: "CREDIT",
        reports: ["NERACA"],
      },
    ],
    companyId: "",
  },
  {
    accountClass: "EQUITY",
    code: "3.1",
    name: "modal",
    accounts: [
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        category: "EKUITAS",
        name: "modal disetor lainnya",
        posisi: "CREDIT",
        reports: ["NERACA", "PERUBAHAN_MODAL"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        category: "LABA_DITAHAN",
        name: "laba ditahan",
        posisi: "CREDIT",
        reports: ["NERACA", "PERUBAHAN_MODAL"],
      },
    ],
    companyId: "",
  },
  {
    accountClass: "REVENUE",
    code: "4.1",
    name: "pendapatan usaha",
    accounts: [
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        category: "PENJUALAN",
        name: "penjualan",
        posisi: "CREDIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        category: "DISKON_PENJUALAN",
        name: "potongan harga",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        category: "RETUR_PENJUALAN",
        name: "retur penjualan",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "pendapatan bonus",
        posisi: "CREDIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "pendapatan bunga bank",
        posisi: "CREDIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "pendapatan lain-lain",
        posisi: "CREDIT",
        reports: ["LABA_RUGI"],
      },
    ],
    companyId: "",
  },
  {
    accountClass: "EXPENSE",
    name: "beban usaha",
    code: "5.1",
    accounts: [
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        category: "HPP",
        name: "harga pokok penjualan",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "gaji dan tunjangan",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "asuransi",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "listrik + air + telepon",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "ongkos angkut",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "komisi kepada karyawan",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "iklan dan promosi",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "bahan bakar minyak",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "sewa gudang",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "sewa kantor",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "perizinan & retribusi",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "biaya makan & minum",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "biaya pajak kenderaan",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "biaya amortisasi merek",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        category: "DISKON_PEMBELIAN",
        name: "potongan pembelian",
        posisi: "CREDIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "biaya bonus penjualan",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "selisih nominal bayar",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "biaya serba serbi",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "biaya peralatan kantor",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "biaya penyusutan kenderaan",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "biaya lain-lain",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
      {
        id: nanoid(),
        companyId: "",
        groupAccountId: "",
        name: "biaya administrasi bank",
        posisi: "DEBIT",
        reports: ["LABA_RUGI"],
      },
    ],
    companyId: "",
  },
];
