import java.net.InetSocketAddress
import play.sbt.PlayRunHook
import sbt._

object UIBuild {
  def apply(base: File): PlayRunHook = {
    object UIBuildHook extends PlayRunHook {
      var process: Option[Process] = None

      override def beforeStarted() = {
        if (!(base / "ui" / "node_modules").exists()) Process("npm" :: "install" :: Nil, base / "ui").run
      }

      override def afterStarted(addr: InetSocketAddress) = {
        process = Option(
          Process("node_modules/webpack/bin/webpack.js --watch", base / "ui").run
        )
      }

      override def afterStopped() = {
        process.foreach(_.destroy())
        process = None
      }
    }

    UIBuildHook
  }
}