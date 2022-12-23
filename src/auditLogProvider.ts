import { AuditLogProvider } from "@pankod/refine-core";
import { dataProvider } from "@pankod/refine-supabase";
import { supabaseClient } from "utility";

export const auditLogProvider: AuditLogProvider = {
  get: async ({ resource }) => {
    const { data } = await dataProvider(supabaseClient).getList({
      resource: "logs",
    });

    return data;
  },
  create: params => {
    return dataProvider(supabaseClient).create({
      resource: "logs",
      variables: params,
    });
  },
  update: async ({ id, name }) => {
    const { data } = await dataProvider(supabaseClient).update({
      resource: "logs",
      id,
      variables: { name },
    });

    return data;
  }
};