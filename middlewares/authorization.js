import jwt from 'jsonwebtoken';


export function authorizeParent(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      error: {
        message: 'Unauthorized',
        code: 401
      }
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const requiredRole = 'parent';
    if (decoded.role === requiredRole) {
      req.body.userId = decoded.id;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(403).json({
      error: {
        message: 'Invalid token',
        code: 403
      }
    });
  }
}



export function authorizeStaff(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      error: {
        message: 'Unauthorized',
        code: 401
      }
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const requiredRole = 'staff';
    if (decoded.role === requiredRole) {
      req.body.parentId = decoded.id;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(403).json({
      error: {
        message: 'Invalid token',
        code: 403
      }
    });
  }
}
