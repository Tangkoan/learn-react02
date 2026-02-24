សង្ខេបមេរៀនឡើងវិញ

keyword :
- prop : មកពីពាក្យពេញថា Properties វាគឺជា មធ្យោបាយសម្រាប់បញ្ជូនទិន្នន័យពី Component មួយ (Parent) ទៅកាន់ Component មួយទៀត (Child)


ដំបូងយើងទៅបង្កើត ProductCard.jsx នៅក្នុង Floder src/component/product/ProductCard.jsx
file ProductPage.jsx

const objP = {
    name: "Mackbook 2022",
    descriptions: "8GB 256Gb 14-inch M1",
    price: 1600,
    discount: 10,
    image: null,
  }

<ProductCard
      // name={objP.name}
      // description={objP.descriptions}
      // price={objP.price}
      // discount={objP.discount}
      // image={objP.image}

      // វិធីម្យ៉ាងទៀត
      {...objP}
    />

បើករណី pro description គេសរសេរថា des
const objP = {
    name: "Mackbook 2022",
    des: "8GB 256Gb 14-inch M1",
    price: 1600,
    discount: 10,
    image: null,
  }

<ProductCard
      // វិធីម្យ៉ាងទៀត
      {...objP}
      description={objP.des}
    />