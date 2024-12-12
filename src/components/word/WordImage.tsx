interface WordImageProps {
  word: string;
  imageUrl: string;
}

export function WordImage({ word, imageUrl }: WordImageProps) {
  return (
    <div className="relative h-48 rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={word}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}