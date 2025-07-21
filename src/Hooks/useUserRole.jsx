import { useEffect, useState } from "react";

function useUserRole(email) {
  const [roleData, setRoleData] = useState({ role: null, isAdmin: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    fetch(`https://last-try-six-kappa.vercel.app/users/role/${email}`)
      .then(res => res.json())
      .then(data => {
        setRoleData({ role: data.role, isAdmin: data.isAdmin });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [email]);

  return { ...roleData, loading };
}

export default useUserRole;
