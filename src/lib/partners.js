import logoAerostich from "@/images/partners/aerostich.webp";
import logoCyclops from "@/images/partners/cyclops.webp";
import logoLoneRider from "@/images/partners/lone-rider.svg";
import logoChigee from "@/images/partners/chigee.avif";
import logoVeridian from "@/images/partners/veridian.png";
import logoStegra from "@/images/partners/stegra.png";
import logoSabatino from "@/images/partners/sabatino.png";
import logoInsta360 from "@/images/partners/insta360.svg";
import logoPandoMoto from "@/images/partners/pando-moto.svg";

// Shared by the homepage box and the /partners page.
// `description` and `cta` only show on /partners — edit freely.
// `logoBg` (optional) overrides the gray circle behind the logo.
export const partners = [
  {
    company: "Insta360",
    title: "Action & 360 cameras",
    logo: logoInsta360,
    link: "https://www.insta360.com/sal/x6?utm_source=AffiliateCenter&utm_medium=copylink&utm_term=BUGMOTO",
    description:
      "Insta360 makes the action and 360 cameras I use to film the channel, including the X6. Use the link below to get a free accessory if you buy an X6. Or, use the promo code BUGMOTO in Insta360's store.",
    cta: "Shop Insta360 [affiliate link]",
  },
  {
    company: "Lone Rider",
    title: "Motorcycle bags & accessories",
    logo: logoLoneRider,
    link: "https://www.lonerider-motorcycle.com/?rfsn=8671235.dfdd10",
    description:
      "Lone Rider makes rugged soft luggage and camping gear built for long days on the road.",
    cta: "Shop Lone Rider [affiliate link]",
  },
  {
    company: "Aerostich",
    title: "Riding suits & gear",
    logo: logoAerostich,
    link: "https://aerostich.com/bugmoto",
    description:
      "Aerostich has been making riding suits and gear in Duluth, Minnesota for decades.",
    cta: "Shop Aerostich [affiliate link]",
  },
  {
    company: "Veridian Cruise",
    title: "Motorcycle cruise control",
    logo: logoVeridian,
    logoBg: "bg-white",
    link: "https://veridiancruise.com/?coupon=bugmoto",
    description:
      "Veridian Cruise adds true electronic cruise control to bikes that didn't come with it.",
    cta: "Get Veridian Cruise (code BUGMOTO) [affiliate link]",
  },
  {
    company: "Chigee",
    title: "CarPlay & Android Auto devices",
    logo: logoChigee,
    link: "https://www.chigee.com/BUGMOTO",
    description:
      "Chigee makes weatherproof CarPlay and Android Auto displays for motorcycles.",
    cta: "Visit Chigee  [affiliate link]",
  },
  {
    company: "Pando Moto",
    title: "Motorcycle jeans & apparel",
    logo: logoPandoMoto,
    link: "https://pandomoto.pxf.io/BUGMOTO",
    description:
      "Pando Moto makes protective riding jeans and apparel that look like regular clothes off the bike.",
    cta: "Shop Pando Moto [affiliate link]",
  },
  {
    company: "Cyclops Adventure Sports",
    title: "Auxiliary motorcycle lighting",
    logo: logoCyclops,
    link: "https://www.cyclopsadventuresports.com/",
    description:
      "Cyclops builds bright, reliable auxiliary lighting for adventure and touring bikes.",
    cta: "Visit Cyclops Adventure Sports",
  },
  {
    company: "Stegra.io",
    title: "Navigation software",
    logo: logoStegra,
    link: "https://stegra.io/",
    description:
      "Stegra is navigation software made for motorcyclists who like to plan good roads.",
    cta: "Try Stegra",
  },
  {
    company: "Sabatino Moto",
    title: "Portland's best Royal Enfield dealer",
    logo: logoSabatino,
    link: "https://www.sabatinomoto.com/",
    description:
      "Sabatino Moto is my local Royal Enfield dealer here in Portland, Oregon.",
    cta: "Visit Sabatino Moto",
  },
];
