import { useQuery } from "react-query";
import { getImageById } from "../apis/image";

export default function ImageComponent({id}) {
  const imageQuery = useQuery(['image', id], async () => {
      const t = await getImageById(id)
      const base64String = btoa(new Uint8Array(t.img.data.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      return `data:image/jpg;base64,${base64String}`;
    }
  );

  return (      
    <img src={imageQuery.isLoading || imageQuery.error ? "/default_image.png" : imageQuery.data} className={`w-full h-full object-cover`}/>          
  )
}