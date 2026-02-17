import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

const parseHTML = (html) => {
  if (!html) return;

  return parse(html, {
    replace: (node, index) => {
      if (node?.name === "img") {
        return (
          <Image
            src={node.attribs.src}
            alt={node.attribs.alt}
            width={node.attribs.width ? node.attribs.width : 1000}
            height={node.attribs.height ? node.attribs.height : 1000}
            className="rounded-md"
            // fill
          />
        );
      }
      
         
        }
      }
    
  );
};

export default parseHTML;
