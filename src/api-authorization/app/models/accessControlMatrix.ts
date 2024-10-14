interface AccessRule {
    role: number;
    method: string;
    path: string;
    allowed: boolean;
  }
  
  const accessControlMatrix: AccessRule[] = [
    { role: 1, method: 'GET', path: '/users', allowed: true },   // admin: accès à tous les users
    { role: 1, method: 'POST', path: '/users', allowed: true },  // admin: création d'un user
    { role: 2, method: 'GET', path: '/users', allowed: true },   // moderator: accès à la liste des users
    { role: 2, method: 'POST', path: '/users', allowed: false }, // moderator: ne peut pas créer de user
    { role: 3, method: 'GET', path: '/users/me', allowed: true }, // member: accès à ses propres infos
    { role: 3, method: 'DELETE', path: '/users/:id', allowed: false }, // member: ne peut pas supprimer
  ];
  
  export default accessControlMatrix;