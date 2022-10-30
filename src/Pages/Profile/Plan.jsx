// import { collection, query, where } from "firebase/firestore";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import { db } from "../../Firebase";
import { loadStripe } from "@stripe/stripe-js";
import "./Plan.css";

function Plan() {
  const [products, setProducts] = useState([]);
  const { user } = useUserAuth();

  useEffect(() => {
    // db.collection("products")
    //   .where("active", "==", true)

    const colRef = collection(db, "products");
    const q = query(colRef, where("active", "==", true));
    getDocs(q).then((QuerySnapshot) => {
      // console.log(QuerySnapshot.docs)
      const products = {};
      QuerySnapshot.docs.forEach(async (productDoc) => {
        // console.log(productDoc)
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        // console.log(priceSnap)
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);
  // console.log(products);

  const loadCheckOut = async (priceId) => {
    const data = {
      price: priceId,
      success_url: window.location.origin,
      cancle_url: window.location.origin
    }

    const docRef = doc(db,"customers" , user.uid);
    const colRef = collection(docRef, "checkout")
    addDoc(colRef,data)

    colRef.onSnapshot(async(snap)=>{
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51LsoopSFtCVRBtJUIL77fDcnF7n022GcR5Dkhfqym6UwyRSL5flhnlLUvUbMbd2aK3xz8CEF2M0DvftI2pZUCpwy00oE2p62qo"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plan">
      {Object.entries(products).map(([productId, productData]) => {
        //logic to check if the user's subscription is active or not
        return (
          <div className="planScreen" key={productId}>
            <div className="planScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button onClick={() => loadCheckOut(productData.prices.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plan;
