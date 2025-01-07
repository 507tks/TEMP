import React, { useEffect, useState } from "react";
import NotAuthorisedPage from "../views/NotAuthorisedPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoles, getRoleById } from "../redux/thunk/userrole";
import Loading from "@/views/Loading";

const RoleBasedRoute = ({ children, requiredAccess }) => {
    const dispatch = useDispatch();
    const allRoles = useSelector((state) => state.userrole?.allRoles);
    const role = useSelector((state) => state.userrole?.userRole);
    const [hasAccess, setHasAccess] = useState(false);
    const [loadingAccess, setLoadingAccess] = useState(true);
    const userRoleId = localStorage.getItem("userRoleId");

    useEffect(() => {
        if (userRoleId) {
            dispatch(getRoleById(userRoleId));
        }
    }, [userRoleId, dispatch, setLoadingAccess]);

    useEffect(() => {
        dispatch(getAllRoles());
    }, [dispatch]);

    useEffect(() => {
        if (allRoles && role) {
            const userRole = allRoles.find((r) => r._id === role._id);
            const hasAccess = userRole && (
                userRole.roleAccess === "all" ||
                userRole.roleAccess.some(
                    (access) => {
                        return (
                            access.collectionName === requiredAccess.collectionName
                        );
                    }
                )
            );
            setHasAccess(hasAccess);
            setLoadingAccess(false);
        }
    }, [allRoles, role, requiredAccess]);

    return <>
        {hasAccess && !loadingAccess && children}
        {loadingAccess && !hasAccess && <Loading />}
        {!hasAccess && !loadingAccess && <NotAuthorisedPage />}
    </>;
};

export default RoleBasedRoute;
