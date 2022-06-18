import React from "react"
import { Redirect } from "react-router-dom"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Pages
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// My routes
import  * as pieces from "../pages/Pieces/PieceExports"
import  * as pneu from "../pages/Pneu/PneuExports"
import  * as huile from "../pages/Huile/HuileExports"
import  * as fournisseurs from "../pages/Fournisseur/FournisseurExports"
import  * as demandepieces from "../pages/DemandePiece/DemandePieceExports"
import  * as pieceachetee from "../pages/PiecesAchetee/PiecesAcheteeExports"
import  * as prestataire from "../pages/Prestataire/PrestataireExports"
import  * as interne from "../pages/MaintenanceInterne/MaintenanceInterneExports"
import  * as externe from "../pages/MaintenanceExterne/MaintenanceExterneExports"
import  * as vidange from "../pages/Vidange/VidangeExports"
import  * as pneumatique from "../pages/Pneumatique/PneumatiqueExports"
import  * as contrat from "../pages/Contrat/ContratExports"
import  * as sinistre from "../pages/Sinistre/SinistreExports"
import  * as vignette from "../pages/Vignette/VignetteExports"
import  * as cartegrise from "../pages/CarteGrise/CarteGriseExports"
import  * as assurance from "../pages/assurance/AssuranceExports"
import  * as assureur from "../pages/Assureur/AssureurExports"
import  * as vehicule from "../pages/Vehicule/VehuculeExports"
import  * as entretien from "../pages/Entretien/EntretienExports"
import  * as visite from "../pages/VisiteTechnique/VisiteTechniqueExport"
import  * as demandeintervention from "../pages/DemandeIntervention/DemandeInterventionExports"


// Profile
import UserProfile from "../pages/Authentication/user-profile"

const userRoutes = [

  // My routes

  {path : "/pieces", component: pieces.Piece},
  {path : "/pieces/:id", component: pieces.UpdatePiece},
  {path : "/add-piece", component: pieces.AddPiece},

  {path : "/pneu", component: pneu.Pneu},
  {path : "/pneu/:id", component: pneu.UpdatePneu},
  {path : "/add-pneu", component: pneu.AddPneu},

  {path : "/huile", component: huile.Huile},
  {path : "/huile/:id", component: huile.UpdateHuile},
  {path : "/add-huile", component: huile.AddHuile},

  {path : "/demande-piece", component: demandepieces.DemandePiece},
  {path : "/demande-piece/:id", component: demandepieces.ExploreDemandePiece},
  {path : "/add-demande-piece", component: demandepieces.AddDemandePiece},


  {path : "/fournisseurs", component: fournisseurs.Fournisseur},
  {path : "/add-fournisseur", component: fournisseurs.AddFournisseur},
  {path : "/fournisseur/:id", component: fournisseurs.UpdateFournisseur},

  {path : "/piece-achetee", component: pieceachetee.AchatPiece},
  {path : "/add-achat", component: pieceachetee.AcheterPiece},

  {path : "/prestataire", component: prestataire.Prestataire},
  {path : "/add-prestataire", component: prestataire.AddPrestataire},
  {path : "/prestataire/:id", component: prestataire.UpdatePrestataire},

  {path : "/interne", component: interne.MaintenanceInterne},
  {path : "/add-interne", component: interne.AddMaintenanceInterne},
  {path : "/interne/:id", component: interne.UpdateMaintenanceInterne},

  {path : "/externe", component: externe.MaintenanceExterne},
  {path : "/add-externe", component: externe.AddMaintenanceExterne},

  {path : "/pneumatique", component: pneumatique.Pneumatique},
  {path : "/add-pneumatique", component: pneumatique.AddPneumatique},
  {path : "/pneumatique/:id", component: pneumatique.UpdatePneumatique},

  {path : "/vidange", component: vidange.Vidange},
  {path : "/add-vidange", component: vidange.AddVidange},
  {path : "/vidange/:id", component: vidange.UpdateVidange},

  {path : "/assurance", component: assurance.Assurance},
  {path : "/add-assurance", component: assurance.AddAssurance},
  {path : "/assurance/:id", component: assurance.UpdateAssurance},

  {path : "/assureur", component: assureur.Assureur},
  {path : "/add-assureur", component: assureur.AddAssureur},
  {path : "/assureur/:id", component: assureur.UpdateAssureur},
  
  {path : "/contrat", component: contrat.Contrat},
  {path : "/add-contrat", component: contrat.AddContrat},
  {path : "/contrat/:id", component: contrat.UpdateContrat},

  {path : "/sinistre", component: sinistre.Sinistre},
  {path : "/add-sinistre", component: sinistre.AddSinistre},
  {path : "/sinistres/:id", component: sinistre.UpdateSinistre},

  {path : "/vignette", component: vignette.Vignette},
  {path : "/add-vignette", component: vignette.AddVignette},
  {path : "/vignette/:id", component: vignette.UpdateVignette},

  {path : "/visite-technique", component: visite.VisiteTechnique},
  {path : "/add-visite-technique", component: visite.AddVisiteTechnique},
  {path : "/visite-technique/:id", component: visite.UpdateVisiteTechnique},

  {path : "/entretien", component: entretien.Entretien},
  {path : "/add-entretien", component: entretien.AddEntretien},
  {path : "/entretien/:id", component: entretien.UpdateEntretien},

  {path : "/carte-grise", component: cartegrise.CarteGrise},
  {path : "/add-carte-grise", component: cartegrise.AddCarteGrise},
  {path : "/carte-grise/:id", component: cartegrise.UpdateCarteGrise},

  {path : "/vehicule", component: vehicule.Vehicule},
  {path : "/add-vehicule", component: vehicule.AddVehicule},
  {path : "/vehicule/:id", component: vehicule.ExploreVehicule},

  {path : "/demande-intervention", component: demandeintervention.DemandeIntervention},
  {path : "/add-demande-intervention", component: demandeintervention.AddDemandeIntervention},
  {path : "/demande-intervention/:id", component: demandeintervention.UpdateDemandeIntervention},

  // Dashboard
  { path: "/dashboard", component: Dashboard },

    // //profile
    { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [

  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  
  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

    // Authentication Inner
    { path: "/pages-login", component: Login1 },
    { path: "/pages-register", component: Register1 },
    { path: "/page-recoverpw", component: Recoverpw },
    { path: "/auth-lock-screen", component: LockScreen },
]

export { userRoutes, authRoutes }