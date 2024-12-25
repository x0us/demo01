let FlickityInstance = null

export async function getFlickity() {
  if (!FlickityInstance) {
    const Flickity = (await import('flickity')).default
    await import('flickity-fade') // Load Flickity fade plugin
    FlickityInstance = Flickity
  }
  return FlickityInstance
}
