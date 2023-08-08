export const decodeAssetUrl = (id?: string) => {
    if (!id) {
        throw new Error(`Invalid asset ID: ${id}`);
    }
    const pattern = /^(?:image|file)-([a-f\d]+)-(?:(\d+x\d+)-)?(\w+)$/;
    const match: RegExpExecArray | null = pattern.exec(id);
    if (!match) {
        throw new Error(`Invalid asset ID: ${id}`);
    }
    const [assetId, dimensions, format] = match;
    
    const [width, height] = dimensions
        ? dimensions.split('x').map((v: string) => parseInt(v, 10))
        : [];
    
    return {
        assetId,
        dimensions: { width, height },
        format
    }
}
