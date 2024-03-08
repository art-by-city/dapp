export default (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  opts: { maxHeight: number, maxWidth: number, type: string }
): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    const { naturalWidth, naturalHeight } = image

    let scale = 1
    if (naturalWidth > opts.maxWidth || naturalHeight > opts.maxHeight) {
      const horizontallyOriented = naturalWidth > naturalHeight
      const wScale = opts.maxWidth / (
        horizontallyOriented ? naturalWidth : naturalHeight
      )
      const hScale = opts.maxHeight / (
        horizontallyOriented ? naturalHeight : naturalWidth
      )
      scale = wScale < hScale ? wScale : hScale
    }

    canvas.width = naturalWidth * scale
    canvas.height = naturalHeight * scale

    const ctx = canvas.getContext('2d')
    ctx!.imageSmoothingEnabled = true
    ctx!.imageSmoothingQuality = 'high'
    ctx!.fillStyle = 'white'
    ctx!.fillRect(0, 0, canvas.width, canvas.height)
    ctx!.drawImage(image, 0, 0, canvas.width, canvas.height)
    
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob)
      } else {
        reject('Error generating image preview from canvas')
      }
    }, opts.type)
  })
}
