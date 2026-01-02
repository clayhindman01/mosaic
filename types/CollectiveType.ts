export type CollectiveType = {
    collective_id: number,
    collective_name: string,
    collective_photo: string | null | undefined,
    incomplete_mosaics_count: number,
    permissions: number
}