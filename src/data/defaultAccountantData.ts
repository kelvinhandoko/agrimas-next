import { type AccountPayload, type GroupAccountPayload } from "@/model";

interface GroupAccountPayloadWithAccount extends GroupAccountPayload {
  accounts: AccountPayload[];
}

// default group account
export const defaultGroupAccountData: GroupAccountPayloadWithAccount[] = [
  {
    accountClass: "ASSET",
    name: "aset lancar",
    code: "1.1",
    accounts: [
      {
        companyId: "",
        groupAccountId: "",
        name: "kas besar",
        posisi: "DEBIT",
        report: ["NERACA"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "kas kecil",
        posisi: "DEBIT",
        report: ["NERACA"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "persediaan barang jadi",
        posisi: "DEBIT",
        report: ["NERACA"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "asuransi dibayar dimuka",
        posisi: "DEBIT",
        report: ["NERACA"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "sewa dibayar dimuka",
        posisi: "DEBIT",
        report: ["NERACA"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "piutang usaha",
        posisi: "DEBIT",
        report: ["NERACA"],
      },
    ],
  },
  {
    accountClass: "ASSET",
    name: "aset tetap",
    code: "1.2",
    accounts: [
      {
        companyId: "",
        groupAccountId: "",
        name: "alat berat dan kenderaan",
        posisi: "DEBIT",
        report: ["NERACA"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "hak merek",
        posisi: "DEBIT",
        report: ["NERACA"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "ak.penyusutan kenderaan",
        posisi: "CREDIT",
        report: ["NERACA"],
      },
    ],
  },
  {
    accountClass: "LIABILITY",
    name: "hutang lancar",
    code: "2.1",
    accounts: [
      {
        companyId: "",
        groupAccountId: "",
        name: "hutang usaha",
        posisi: "CREDIT",
        report: ["NERACA"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "PPh 21",
        posisi: "CREDIT",
        report: ["NERACA"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "PPh 23",
        posisi: "CREDIT",
        report: ["NERACA"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "PPN",
        posisi: "CREDIT",
        report: ["NERACA"],
      },
    ],
  },
  {
    accountClass: "LIABILITY",
    name: "hutang jangka panjang",
    code: "2.2",
    accounts: [
      {
        companyId: "",
        groupAccountId: "",
        name: "hutang pinjaman",
        posisi: "CREDIT",
        report: ["NERACA"],
      },
    ],
  },
  {
    accountClass: "EQUITY",
    code: "3.1",
    name: "modal",
    accounts: [
      {
        companyId: "",
        groupAccountId: "",
        name: "modal disetor lainnya",
        posisi: "CREDIT",
        report: ["NERACA", "PERUBAHAN_MODAL"],
      },
    ],
  },
  {
    accountClass: "REVENUE",
    code: "4.1",
    name: "pendapatan usaha",
    accounts: [
      {
        companyId: "",
        groupAccountId: "",
        name: "penjualan",
        posisi: "CREDIT",
        report: ["LABA_RUGI"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "pendapatan bonus",
        posisi: "CREDIT",
        report: ["LABA_RUGI"],
      },
    ],
  },
  {
    accountClass: "REVENUE",
    code: "4.2",
    name: "pendapatan lainnya",
    accounts: [
      {
        companyId: "",
        groupAccountId: "",
        name: "pendapatan bunga bank",
        posisi: "CREDIT",
        report: ["LABA_RUGI"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "pendapatan lain-lain",
        posisi: "CREDIT",
        report: ["LABA_RUGI"],
      },
    ],
  },
  {
    accountClass: "EXPENSE",
    name: "beban usaha",
    code: "5.1",
    accounts: [
      {
        companyId: "",
        groupAccountId: "",
        name: "biaya gaji dan tunjangan",
        posisi: "DEBIT",
        report: ["LABA_RUGI"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "biaya asuransi",
        posisi: "DEBIT",
        report: ["LABA_RUGI"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "biaya listrik + air + telepon",
        posisi: "DEBIT",
        report: ["LABA_RUGI"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "biaya iklan dan promosi",
        posisi: "DEBIT",
        report: ["LABA_RUGI"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "biaya makan & minum",
        posisi: "DEBIT",
        report: ["LABA_RUGI"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "biaya peralatan kantor",
        posisi: "DEBIT",
        report: ["LABA_RUGI"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "biaya penyusutan kenderaan",
        posisi: "DEBIT",
        report: ["LABA_RUGI"],
      },
    ],
  },
  {
    accountClass: "EXPENSE",
    code: "5.2",
    name: "beban lainnya",
    accounts: [
      {
        companyId: "",
        groupAccountId: "",
        name: "biaya amortisasi merek",
        posisi: "DEBIT",
        report: ["LABA_RUGI"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "biaya serba serbi",
        posisi: "DEBIT",
        report: ["LABA_RUGI"],
      },
      {
        companyId: "",
        groupAccountId: "",
        name: "biaya administrasi bank",
        posisi: "DEBIT",
        report: ["LABA_RUGI"],
      },
    ],
  },
];
